'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as XLSX from 'xlsx';
// import FileUpload from './components/FileUpload';
// import TextElement from './components/TextElement';
// import BarcodeGenerator from './components/BarcodeGenerator';
// import './App.css';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ data, textElements, width, height, onDrop }: any) => {
    const barcodeRef = useRef(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TEXT',
        drop: (item: any, monitor: any) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            onDrop(item.id, left, top);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [onDrop]);

    useEffect(() => {
        if (data.length > 1) {
            JsBarcode(barcodeRef.current, data[1][0], {
                format: 'CODE128',
                width: width,
                height: height,
                displayValue: true,
            });
        }
    }, [data, width, height]);

    return (
        <div
            ref={drop}
            style={{

                position: 'relative',
                // width: `${width * 10}px`,
                width: `268px`,
                height: `237px`,
                // height: `${height}px`,
                border: '1px solid #ccc',
                margin: '0 auto',
                backgroundColor: isOver ? 'lightyellow' : 'white',
            }}
        >
            <svg ref={barcodeRef}></svg>
            {textElements.map((element: any) => (
                <TextElement key={element.id} {...element} />
            ))}
        </div>
    );
};

const DraggableBarcode = ({ data, width, height, left, top, onDrop }: any) => {
    const barcodeRef = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BARCODE',
        item: { left, top },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [left, top]);

    const [, drop] = useDrop(() => ({
        accept: 'BARCODE',
        drop: (item: any, monitor: any) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            onDrop(newLeft, newTop);
        },
    }), [onDrop]);

    useEffect(() => {
        if (data.length > 1) {
            JsBarcode(barcodeRef.current, data[1][0], {
                format: 'CODE128',
                width: width,
                height: height,
                displayValue: true,
            });
        }
    }, [data, width, height]);

    return (
        <div
            ref={node => drag(drop(node))}
            style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <svg ref={barcodeRef}></svg>
        </div>
    );
};

function FileUpload({ onFileUpload }: any) {
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                onFileUpload(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </div>
    );
}
const TextElement = ({ id, left, top, text }: any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TEXT',
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, left, top]);

    return (
        <div
            ref={drag}
            style={{
                position: 'absolute',
                left,
                top,
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
                padding: '2px 5px',
                backgroundColor: '#fff',
                border: '1px solid #000',
                borderRadius: '3px',
            }}
        >
            {text}
        </div>
    );
};



function page() {
    const [data, setData] = useState<any>([]);
    const [availableFields, setAvailableFields] = useState<any>([]);
    const [selectedFields, setSelectedFields] = useState<any>([]);
    const [textElements, setTextElements] = useState<any>([]);
    const [barcodePosition, setBarcodePosition] = useState<any>({ left: 50, top: 50 });
    const [barcodeConfig, setBarcodeConfig] = useState<any>({
        width: 2,
        height: 100,
    });

    const handleFileUpload = useCallback((jsonData: any) => {
        setData(jsonData);
        if (jsonData.length > 0) {
            setAvailableFields(jsonData[0]);
        }
    }, []);

    const handleFieldSelection = useCallback((field: any) => {
        setSelectedFields((prevSelectedFields: any) => {
            if (prevSelectedFields.includes(field)) {
                return prevSelectedFields.filter((f: any) => f !== field);
            } else {
                return [...prevSelectedFields, field];
            }
        });
    }, []);

    const handleAddTextElement = useCallback((field: any) => {
        setTextElements((prev: any) => [
            ...prev,
            {
                id: `text-${Date.now()}`,
                text: field,
                left: 10,
                top: 10,
            },
        ]);
    }, []);

    const handleTextElementDrop = useCallback((id: any, left: any, top: any) => {
        setTextElements((prev: any) =>
            prev.map((text: any) =>
                text.id === id ? { ...text, left, top } : text
            )
        );
    }, []);

    const handleBarcodeSizeChange = useCallback((event: any) => {
        const { name, value } = event.target;
        setBarcodeConfig((prev: any) => ({
            ...prev,
            [name]: parseFloat(value),
        }));
    }, []);

    const handleBarcodeDrop = useCallback((left: any, top: any) => {
        setBarcodePosition({ left, top });
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <FileUpload onFileUpload={handleFileUpload} />

                <div style={{ margin: '20px 0' }}>
                    <label>
                        Barcode Width:
                        <input
                            type="number"
                            name="width"
                            value={barcodeConfig.width}
                            onChange={handleBarcodeSizeChange}
                            step="0.1"
                            min="1"
                        />
                    </label>
                    <label>
                        Barcode Height:
                        <input
                            type="number"
                            name="height"
                            value={barcodeConfig.height}
                            onChange={handleBarcodeSizeChange}
                            min="50"
                        />
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3>Available Fields</h3>
                        {availableFields.map((field: any, index: any) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`field-${index}`}
                                    onChange={() => handleFieldSelection(field)}
                                />
                                <label htmlFor={`field-${index}`}>{field}</label>
                                {selectedFields.includes(field) && (
                                    <button onClick={() => handleAddTextElement(field)}>
                                        Add to Barcode
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ width: '500px', height: '300px', position: 'relative', border: '1px solid #ccc' }}>
                        <DraggableBarcode
                            data={data}
                            width={barcodeConfig.width}
                            height={barcodeConfig.height}
                            left={barcodePosition.left}
                            top={barcodePosition.top}
                            onDrop={handleBarcodeDrop}
                        />
                        {textElements.map((element: any) => (
                            <TextElement key={element.id} {...element} onDrop={handleTextElementDrop} />
                        ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}

export default page;
