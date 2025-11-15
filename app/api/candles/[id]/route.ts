import { NextResponse, NextRequest } from "next/server";
import { getCollection } from "@/lib/mongodb";
import type { Product } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const candlesCollection = await getCollection<Product>("candles");
    const candle = await candlesCollection.findOne({ id });

    if (!candle) {
      return NextResponse.json(
        {
          success: false,
          error: "Candle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: candle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching candle:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch candle",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const candlesCollection = await getCollection<Product>("candles");

    const result = await candlesCollection.updateOne({ id }, { $set: body });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Candle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Candle updated successfully",
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating candle:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update candle",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const candlesCollection = await getCollection<Product>("candles");

    const result = await candlesCollection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Candle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Candle deleted successfully",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting candle:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete candle",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
