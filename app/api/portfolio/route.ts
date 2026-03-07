import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Portfolio } from '@/models/Portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const portfolio = await Portfolio.findOne().sort({ updatedAt: -1 });
    
    if (!portfolio) {
      // Return 200 with null so the frontend knows the connection is OK but data is empty
      return NextResponse.json(null, { status: 200 });
    }
    
    return NextResponse.json(portfolio);
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    // We update the existing one or create a new one if it doesn't exist
    const portfolio = await Portfolio.findOneAndUpdate(
      {}, // empty filter to find the first one
      { ...body },
      { upsert: true, new: true }
    );
    
    return NextResponse.json(portfolio);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
