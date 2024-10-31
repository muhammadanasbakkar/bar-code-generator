'use client'

import { useState } from 'react';
import QRCode from 'qrcode';
import Papa from 'papaparse';

const QrCode = () => {
    const [qrCodes, setQrCodes] = useState<string[]>([]);
    const [width, setWidth] = useState<number>(300);
    const [height, setHeight] = useState<number>(300);
    const [color, setColor] = useState<string>('#000000');
    const [background, setBackground] = useState<string>('#ffffff');
    const [margin, setMargin] = useState<number>(4);

    const generateQRCode = async (text: string): Promise<string> => {
        try {
            return await QRCode.toDataURL(text, {
                width: width,
                height: height,
                color: {
                    dark: color,
                    light: background,
                },
                margin: margin,
            });
        } catch (error) {
            console.error('Error generating QR code', error);
            return '';
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            complete: async (results) => {
                const data = results.data as Record<string, string>[];
                const generatedQRCodes = await Promise.all(
                    data.map(async (row) => {
                        const concatenatedRow = Object.values(row).join(' ');
                        return await generateQRCode(concatenatedRow);
                    })
                );
                setQrCodes(generatedQRCodes);
            },
        });
    };

    return (
        <div style={{ padding: '30px', textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h1>QR Code Generator</h1>

            {/* Form Section */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }}>
                    <label>
                        Width:
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <label>
                        Height:
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(parseInt(e.target.value))}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <label>
                        Foreground Color:
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <label>
                        Background Color:
                        <input
                            type="color"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <label>
                        Margin:
                        <input
                            type="number"
                            value={margin}
                            onChange={(e) => setMargin(parseInt(e.target.value))}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>

                </div>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginTop: '20px' }} />
                <div>
                    {qrCodes.length > 0 && (
                        <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            // flexWrap: "wrap",
                            // justifyContent:"space-between"

                        }}>
                            {qrCodes.map((code, index) => (
                                <div key={index} style={{ marginBottom: '0px' }}>
                                    <img src={code} alt={`QR Code ${index + 1}`} style={{ margin: '0px', maxWidth: '100%' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* QR Codes Display Section */}
            {/* <div>

      </div> */}
        </div>
    );
}

export default QrCode
