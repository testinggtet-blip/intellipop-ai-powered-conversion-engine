import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { popups } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single popup by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const popup = await db
        .select()
        .from(popups)
        .where(eq(popups.id, parseInt(id)))
        .limit(1);

      if (popup.length === 0) {
        return NextResponse.json(
          { error: 'Popup not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(popup[0], { status: 200 });
    }

    // List all popups with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(popups).orderBy(desc(popups.createdAt));

    if (search) {
      const searchTerm = `%${search}%`;
      query = query.where(
        or(
          like(popups.name, searchTerm),
          like(popups.headline, searchTerm)
        )
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!body.headline || typeof body.headline !== 'string' || body.headline.trim() === '') {
      return NextResponse.json(
        { error: 'Headline is required and must be a non-empty string', code: 'MISSING_HEADLINE' },
        { status: 400 }
      );
    }

    if (!body.buttonText || typeof body.buttonText !== 'string' || body.buttonText.trim() === '') {
      return NextResponse.json(
        { error: 'Button text is required and must be a non-empty string', code: 'MISSING_BUTTON_TEXT' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Prepare insert data with defaults
    const insertData = {
      name: body.name.trim(),
      template: body.template ? body.template.trim() : null,
      headline: body.headline.trim(),
      subheadline: body.subheadline ? body.subheadline.trim() : null,
      buttonText: body.buttonText.trim(),
      backgroundColor: body.backgroundColor?.trim() || '#ffffff',
      textColor: body.textColor?.trim() || '#000000',
      buttonColor: body.buttonColor?.trim() || '#6366f1',
      borderRadius: typeof body.borderRadius === 'number' ? body.borderRadius : 12,
      showImage: typeof body.showImage === 'boolean' ? body.showImage : true,
      showCloseButton: typeof body.showCloseButton === 'boolean' ? body.showCloseButton : true,
      showOverlay: typeof body.showOverlay === 'boolean' ? body.showOverlay : true,
      closeOnOutsideClick: typeof body.closeOnOutsideClick === 'boolean' ? body.closeOnOutsideClick : true,
      animationEnabled: typeof body.animationEnabled === 'boolean' ? body.animationEnabled : true,
      animationStyle: body.animationStyle?.trim() || 'fade',
      embedCode: body.embedCode ? body.embedCode.trim() : null,
      isPublished: typeof body.isPublished === 'boolean' ? body.isPublished : false,
      createdAt: now,
      updatedAt: now,
    };

    const newPopup = await db
      .insert(popups)
      .values(insertData)
      .returning();

    return NextResponse.json(newPopup[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if popup exists
    const existingPopup = await db
      .select()
      .from(popups)
      .where(eq(popups.id, parseInt(id)))
      .limit(1);

    if (existingPopup.length === 0) {
      return NextResponse.json(
        { error: 'Popup not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Prepare update data (only include provided fields)
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || body.name.trim() === '') {
        return NextResponse.json(
          { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updateData.name = body.name.trim();
    }

    if (body.template !== undefined) {
      updateData.template = body.template ? body.template.trim() : null;
    }

    if (body.headline !== undefined) {
      if (typeof body.headline !== 'string' || body.headline.trim() === '') {
        return NextResponse.json(
          { error: 'Headline must be a non-empty string', code: 'INVALID_HEADLINE' },
          { status: 400 }
        );
      }
      updateData.headline = body.headline.trim();
    }

    if (body.subheadline !== undefined) {
      updateData.subheadline = body.subheadline ? body.subheadline.trim() : null;
    }

    if (body.buttonText !== undefined) {
      if (typeof body.buttonText !== 'string' || body.buttonText.trim() === '') {
        return NextResponse.json(
          { error: 'Button text must be a non-empty string', code: 'INVALID_BUTTON_TEXT' },
          { status: 400 }
        );
      }
      updateData.buttonText = body.buttonText.trim();
    }

    if (body.backgroundColor !== undefined) {
      updateData.backgroundColor = body.backgroundColor.trim();
    }

    if (body.textColor !== undefined) {
      updateData.textColor = body.textColor.trim();
    }

    if (body.buttonColor !== undefined) {
      updateData.buttonColor = body.buttonColor.trim();
    }

    if (body.borderRadius !== undefined) {
      updateData.borderRadius = body.borderRadius;
    }

    if (body.showImage !== undefined) {
      updateData.showImage = body.showImage;
    }

    if (body.showCloseButton !== undefined) {
      updateData.showCloseButton = body.showCloseButton;
    }

    if (body.showOverlay !== undefined) {
      updateData.showOverlay = body.showOverlay;
    }

    if (body.closeOnOutsideClick !== undefined) {
      updateData.closeOnOutsideClick = body.closeOnOutsideClick;
    }

    if (body.animationEnabled !== undefined) {
      updateData.animationEnabled = body.animationEnabled;
    }

    if (body.animationStyle !== undefined) {
      updateData.animationStyle = body.animationStyle.trim();
    }

    if (body.embedCode !== undefined) {
      updateData.embedCode = body.embedCode ? body.embedCode.trim() : null;
    }

    if (body.isPublished !== undefined) {
      updateData.isPublished = body.isPublished;
    }

    const updatedPopup = await db
      .update(popups)
      .set(updateData)
      .where(eq(popups.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPopup[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if popup exists
    const existingPopup = await db
      .select()
      .from(popups)
      .where(eq(popups.id, parseInt(id)))
      .limit(1);

    if (existingPopup.length === 0) {
      return NextResponse.json(
        { error: 'Popup not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedPopup = await db
      .delete(popups)
      .where(eq(popups.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Popup deleted successfully',
        popup: deletedPopup[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}