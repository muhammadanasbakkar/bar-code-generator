'use client'

import { useState, useEffect } from 'react';
import jsBarcode from 'jsbarcode';
import * as XLSX from 'xlsx';
import Image from 'next/image';

const HCM39 = () => {
    const [barcodes, setBarcodes] = useState<string[]>([]);
    const [widthInches, setWidthInches] = useState<number>(0.02); // Width in inches
    const [heightInches, setHeightInches] = useState<number>(1); // Height in inches
    const [color, setColor] = useState<string>('#000000');
    const [background, setBackground] = useState<string>('#ffffff');
    const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
    const [data, setData] = useState<string[][]>([]);
    const [format, setFormat] = useState<string>('UPC'); // Default to UPC format
    const [inputValue, setInputValue] = useState<string>(''); // State to hold user input
    const [inputBarcode, setInputBarcode] = useState<string>('');

    const handleSelectChange = (event: any) => {
        setFormat(event.target.value);
    };

    const inchToPixel = (inches: number) => {
        return inches * 96; // Convert inches to pixels
    };

    const generateBarcode = (text: string): string => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = inchToPixel(widthInches); // Adjusted to use dynamic width
            canvas.height = inchToPixel(heightInches); // Adjusted to use dynamic height
            jsBarcode(canvas, text, {
                width: inchToPixel(widthInches),
                height: inchToPixel(heightInches),
                displayValue: true,
                background: background,
                fontOptions: 'bold', // Optional: Make the text bold
                font: 'Arial', // Set font type
                fontSize: 20,  // Set font size
                textMargin: 5, // Margin between text and barcode
                lineColor: color,
                margin: margin,
                format: "CODE39"
            });
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error generating barcode', error);
            return '';
        }
    };

    useEffect(() => {
        // Regenerate barcodes when any parameter or data changes
        const generatedBarcodes = data.slice(1).map((item: any) => {
            const upc = item[5];
            if (upc) {
                return generateBarcode(upc);
            } else {
                console.warn('UPC code missing in data:', item);  // Debug log
                return '';
            }
        });
        setBarcodes(generatedBarcodes.filter(Boolean));  // Filter out any empty barcodes
    }, [widthInches, heightInches, color, background, margin, format, data]); // Dependencies array

    useEffect(() => {
        if (inputValue) {
            setInputBarcode(generateBarcode(inputValue));
        } else {
            setInputBarcode('');
        }
    }, [inputValue, widthInches, heightInches, color, background, margin, format]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (!arrayBuffer) {
                console.error('Failed to read file.');
                return;
            }

            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setData(jsonData);
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };

        reader.readAsArrayBuffer(file);
    };


    const handlePrint = () => {
        let dataFormat = { inputValue, widthInches, heightInches, color, background, margin, format }
        localStorage.setItem('BarCode', JSON.stringify({ data, dataFormat }));
        window.open('/print/HCM39-print', '_blank');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <h1>Barcode Generator</h1>

            {/* Form Section */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div>
                    <input
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter value to generate barcode"
                        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
                    />
                    <select onChange={handleSelectChange} value={format}>
                        <option value="UPC">UPC</option>
                        <option value="EAN-13">EAN-13</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                    <label style={{ flexGrow: 1 }}>
                        Bar Width (inches):
                        <input
                            type="range"
                            step="0.01"
                            min="0.02"
                            max="2"
                            value={widthInches}
                            onChange={(e) => setWidthInches(parseFloat(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                        {widthInches} inches
                    </label>
                </div>
                <div>
                    <label style={{ flexGrow: 1 }}>
                        Bar Height (inches):
                        <input
                            type="range"
                            step="0.01"
                            min="0.5"
                            max="3"
                            value={heightInches}
                            onChange={(e) => setHeightInches(parseFloat(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                        {heightInches} inches
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Margin (pixels):
                        <input
                            type="number"
                            value={margin}
                            min={0}
                            max={20}
                            onChange={(e) => setMargin(parseInt(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Line Color:
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Background Color:
                        <input
                            type="color"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>

                </div>
                <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
            </div>

            {/* Print Button */}
            <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

            {/* Barcodes Display Section */}
            <div id="print-qr-code" style={{
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '600px',
                display: 'grid',
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: '10px',
                alignItems: 'center'
            }}>
                {inputBarcode && (
                    <div className="barcode-container" style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
                        width: '100%', height: "230px"
                    }}>
                        <img src={inputBarcode} alt="Generated Barcode" style={{ maxWidth: '100%' }} />
                    </div>
                )}
                {data.slice(1).map((row, index) => {
                    const barcode = barcodes[index] || ''; // Ensure there's a barcode or use an empty string
                    return (
                        <div key={index}
                        //  className="barcode-container"
                         style={{
                            // transform: "rotate(90deg)",
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
                            width: '100%', height: "230px"
                        }}>
                            <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px', }}
                            //  className='rotate-90'
                             >
                                <p >STYLE  : {row[0]}</p>
                                <p>COLOR  : {row[4]}</p>
                                <p>SIZE   : {row[2]}</p>
                                <p>PO     : {row[3]}</p>
                            </div>
                            {barcode ? (
                                <img src={barcode} alt={`Barcode ${index + 1}`}
                                    // className='rotate-90'
                                />
                            ) : (
                                <p style={{ color: 'red' }}>Error generating barcode</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HCM39