// src/components/ui/custom-table.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc' | null;
  }>({ key: '', direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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

  const sortData = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key || !sortConfig.direction) return parsedData;

    return [...parsedData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'asc') return <ChevronUp className="h-4 w-4" />;
    if (sortConfig.direction === 'desc') return <ChevronDown className="h-4 w-4" />;
    return null;
  };

  const lastPage = Math.ceil(parsedData.length / itemsPerPage);
  const currentData = getSortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full my-8">
      {title && (
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-4 text-foreground"
        >
          {title}
        </motion.h3>
      )}
      
      <div className={`w-full ${isScrollable ? 'overflow-x-auto' : ''}`}>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <motion.th
                  key={header}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => sortData(header)}
                  className="cursor-pointer group hover:bg-muted/50 transition-colors duration-200"
                >
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <span>{formatHeader(header)}</span>
                      <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {getSortIcon(header)}
                      </span>
                    </div>
                  </TableHead>
                </motion.th>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.1 }}
                onHoverStart={() => setHoveredRow(rowIndex)}
                onHoverEnd={() => setHoveredRow(null)}
              >
                {headers.map((header, colIndex) => (
                  <motion.td
                    key={`${rowIndex}-${colIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (rowIndex * headers.length + colIndex) * 0.05 }}
                  >
                    <TableCell>{row[header]}</TableCell>
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {parsedData.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center px-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground rounded-md border border-input hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {lastPage}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
            disabled={currentPage === lastPage}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground rounded-md border border-input hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}