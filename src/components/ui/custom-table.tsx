'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

interface TableProps {
  title?: string;
  tableData: string;
  caption?: string;
  isScrollable?: boolean;
}

export function CustomTable({
  title,
  tableData,
  caption,
  isScrollable = false
}: TableProps) {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    try {
      const data = JSON.parse(tableData);
      if (Array.isArray(data) && data.length > 0) {
        setParsedData(data);
        setHeaders(Object.keys(data[0]));
      }
    } catch (error) {
      console.error('Error parsing table data:', error);
    }
  }, [tableData]);

  const formatHeader = (header: string) => {
    return header
      .split(/(?=[A-Z])|_/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="w-full my-8">
      {title && (
        <p className="text-xl font-bold mb-4 text-foreground">
          {title}
        </p>
      )}
      
      <div className={`w-full ${isScrollable ? 'overflow-x-auto' : ''}`}>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={header} className="font-semibold">
                  {formatHeader(header)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CustomTable;