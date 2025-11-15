import { NextResponse, NextRequest } from "next/server";
import { getCollection } from "@/lib/mongodb";
import type { Product } from "@/types";
import { ObjectId } from "mongodb";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const id = searchParams.get("id");
    const bestseller = searchParams.get("bestseller");
    const limit = searchParams.get("limit");

    const candlesCollection = await getCollection<Product>("candles");

    // Build query filter safely
    const filter: Record<string, any> = {};

    // If ID is provided, validate and convert to ObjectId
    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, error: "Invalid ID format" },
          { status: 400 }
        );
      }
      filter._id = new ObjectId(id);
    }

    // Bestseller filter - only apply when explicitly provided
    if (bestseller === "true") filter.isBestseller = true;
    if (bestseller === "false") filter.isBestseller = false;

    // Build query
    let query = candlesCollection.find(filter);

    if (limit && !isNaN(Number(limit))) {
      query = query.limit(Number(limit));
    }

    const candles = await query.toArray();

    // Not found case when filtering by ID
    if (id && candles.length === 0) {
      return NextResponse.json(
        { success: false, error: "Candle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: candles,
        count: candles.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching candles:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch candles",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "id",
      "name",
      "description",
      "basePrice",
      "fragrances",
      "tiers",
    ];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    const candlesCollection = await getCollection<Product>("candles");

    // Check if candle with same ID already exists
    const existingCandle =
      !!body.id &&
      (await candlesCollection.findOne({
        id: new ObjectId(body.id),
      }));
    console.log({ existingCandle, id: body.id });

    if (existingCandle) {
      return NextResponse.json(
        {
          success: false,
          error: "Candle with this ID already exists",
        },
        { status: 409 }
      );
    }
    const { id, ...modifiedBody } = body;
    const result = await candlesCollection.insertOne(modifiedBody as Product);

    return NextResponse.json(
      {
        success: true,
        message: "Candle added successfully",
        insertedId: result.insertedId,
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding candle:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add candle",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
