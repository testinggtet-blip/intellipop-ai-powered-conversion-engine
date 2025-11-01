import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { popups } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || isNaN(parseInt(id))) {
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
        { error: 'Popup not found', code: 'POPUP_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(popup[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingPopup = await db
      .select()
      .from(popups)
      .where(eq(popups.id, parseInt(id)))
      .limit(1);

    if (existingPopup.length === 0) {
      return NextResponse.json(
        { error: 'Popup not found', code: 'POPUP_NOT_FOUND' },
        { status: 404 }
      );
    }

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

    if (body.template !== undefined) updateData.template = body.template;

    if (body.headline !== undefined) {
      if (typeof body.headline !== 'string' || body.headline.trim() === '') {
        return NextResponse.json(
          { error: 'Headline must be a non-empty string', code: 'INVALID_HEADLINE' },
          { status: 400 }
        );
      }
      updateData.headline = body.headline.trim();
    }

    if (body.subheadline !== undefined) updateData.subheadline = body.subheadline;

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
      updateData.backgroundColor = body.backgroundColor;
    }

    if (body.textColor !== undefined) {
      updateData.textColor = body.textColor;
    }

    if (body.buttonColor !== undefined) {
      updateData.buttonColor = body.buttonColor;
    }

    if (body.borderRadius !== undefined) {
      const radius = parseInt(body.borderRadius);
      if (isNaN(radius)) {
        return NextResponse.json(
          { error: 'Border radius must be a valid integer', code: 'INVALID_BORDER_RADIUS' },
          { status: 400 }
        );
      }
      updateData.borderRadius = radius;
    }

    if (body.showImage !== undefined) {
      updateData.showImage = Boolean(body.showImage);
    }

    if (body.showCloseButton !== undefined) {
      updateData.showCloseButton = Boolean(body.showCloseButton);
    }

    if (body.showOverlay !== undefined) {
      updateData.showOverlay = Boolean(body.showOverlay);
    }

    if (body.closeOnOutsideClick !== undefined) {
      updateData.closeOnOutsideClick = Boolean(body.closeOnOutsideClick);
    }

    if (body.animationEnabled !== undefined) {
      updateData.animationEnabled = Boolean(body.animationEnabled);
    }

    if (body.animationStyle !== undefined) {
      updateData.animationStyle = body.animationStyle;
    }

    if (body.embedCode !== undefined) {
      updateData.embedCode = body.embedCode;
    }

    if (body.isPublished !== undefined) {
      updateData.isPublished = Boolean(body.isPublished);
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

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingPopup = await db
      .select()
      .from(popups)
      .where(eq(popups.id, parseInt(id)))
      .limit(1);

    if (existingPopup.length === 0) {
      return NextResponse.json(
        { error: 'Popup not found', code: 'POPUP_NOT_FOUND' },
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