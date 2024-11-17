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

interface ParsedData {
  [key: string]: string | number;
}

export function CustomTable({
  title,
  tableData,
  caption,
  isScrollable = false
}: TableProps) {
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    try {
      const data: ParsedData[] = JSON.parse(tableData);
      if (Array.isArray(data) && data.length > 0) {
        setParsedData(data);
        setHeaders(Object.keys(data[0]));
      }
    } catch (error) {
      console.error('Error parsing table data:', error);
    }
  }, [tableData]);

  const formatHeader = (header: string): string => {
    return header
      .split(/(?=[A-Z])|_/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (parsedData.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-8">
      {title && (
        <h3 className="text-xl font-bold mb-4 text-foreground">
          {title}
        </h3>
      )}
      
      <div className={`w-full ${isScrollable ? 'overflow-x-auto' : ''}`}>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="font-semibold">
                  {formatHeader(header)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header}`}>
                    {String(row[header])}
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