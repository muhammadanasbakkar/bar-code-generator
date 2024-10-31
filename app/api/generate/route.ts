// app/api/generate/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import QRCode from 'qrcode';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const text = searchParams.get('text');

//   if (!text) {
//     return NextResponse.json({ error: 'Text is required' }, { status: 400 });
//   }

//   try {
//     const qrCode = await QRCode.toDataURL(text);
//     return NextResponse.json({ qrCode });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
//   }
// }


// app/api/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
    const { searchParams }: any = new URL(request.url);
    const text = searchParams.get('text');
    const width = searchParams.get('width') ? parseInt(searchParams.get('width')) : 300;
    const height = searchParams.get('height') ? parseInt(searchParams.get('height')) : 300;
    const color = searchParams.get('color') || '#000000';
    const background = searchParams.get('background') || '#ffffff';
    const margin = searchParams.get('margin') ? parseInt(searchParams.get('margin')) : 4;

    if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    try {
        const qrCode:any = await QRCode.toDataURL(text, {
            width: width,
            height: height,
            color: {
                dark: color,
                light: background
            },
            margin: margin
        });
        return NextResponse.json({ qrCode });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
    }
}
