import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return new NextResponse("Items are required", { status: 400 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing. Please add it to your .env.local file.");
            return new NextResponse("Stripe secret key not configured", { status: 500 });
        }

        // Initialize Stripe with the secret key from environment variables
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2026-05-27.dahlia",
        });

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: item.posterUrl ? [item.posterUrl] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
                },
                quantity: 1,
            })),
            mode: "payment",
            success_url: `${req.headers.get("origin")}/watchlist?success=true`,
            cancel_url: `${req.headers.get("origin")}/watchlist?canceled=true`,
            metadata: {
                movieIds: items.map((i: any) => i.id).join(","),
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Error creating checkout session:", err);
        return new NextResponse(err.message || "Internal Error", { status: err.statusCode || 500 });
    }
}
