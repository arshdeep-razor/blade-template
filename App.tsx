import {
  Table,
  Heading,
  Box,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Amount,
  Badge,
  TableToolbar,
  TableToolbarActions,
  Button,
  useTheme,
  Text,
} from '@razorpay/blade/components';
import type { TableData } from '@razorpay/blade/components';
import React, { useState } from 'react';

type Item = {
  id: string;
  paymentId: string;
  amount: number;
  date: Date;
  status: string;
};

const nodes: Item[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: (i + 1).toString(),
    paymentId: `rzp${Math.floor(Math.random() * 1000000)} random long text`,
    amount: Number((Math.random() * 10000).toFixed(2)),
    date: new Date(
      2021,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ),
    status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
    account: Math.floor(Math.random() * 1000000000).toString(),
  })),
];

const data: TableData<Item> = {
  nodes,
};

function App(): React.ReactElement {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const { platform } = useTheme();
  const onMobile = platform === 'onMobile';
  const selectedItemsLength = selectedItems.length;
  return (
    <Box
      backgroundColor="surface.background.gray.intense"
      padding="spacing.5"
      overflow="auto"
      minHeight="400px"
    >
      <Box paddingBottom="spacing.4">
        <Heading>Multi Selectable Table with Toolbar</Heading>
        <Text>(Tip: Expand screen Width to see layout changes in toolbar)</Text>
      </Box>
      <Table
        data={data}
        onSelectionChange={({ values }) => setSelectedItems(values)}
        toolbar={
          <TableToolbar
            title="Showing Recent Transactions"
            selectedTitle={`${selectedItemsLength} Transaction${
              selectedItemsLength > 1 ? 's' : ''
            } Selected`}
          >
            <TableToolbarActions>
              <Button
                variant="secondary"
                marginRight="spacing.2"
                isFullWidth={onMobile}
              >
                Export
              </Button>
              <Button isFullWidth={onMobile}>Refund</Button>
            </TableToolbarActions>
          </TableToolbar>
        }
      >
        {(tableData) => (
          <>
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Method</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {tableData.map((tableItem, index) => (
                <TableRow key={index} item={tableItem}>
                  {/* Add overflow: hidden to cell wrapper */}
                  <TableCell>
                    {/* Add text-overflow: ellipsis & overflow: hidden to below Text */}
                    <Box whiteSpace="normal">
                      <Text wordBreak="break-all">
                        cajdfnsl dasljdfnsalfk dsadasd
                      </Text>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Amount value={tableItem.amount} />
                  </TableCell>
                  <TableCell>
                    {tableItem.date?.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      size="medium"
                      color={
                        tableItem.status === 'Completed'
                          ? 'positive'
                          : tableItem.status === 'Pending'
                          ? 'notice'
                          : tableItem.status === 'Failed'
                          ? 'negative'
                          : 'default'
                      }
                    >
                      {tableItem.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </Box>
  );
}

export default App;
