import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from "@mui/material";

const requests = [
  { tenant: "John Doe", property: "2 BHK Apartment", status: "Pending" },
  { tenant: "Alice Smith", property: "Studio Apartment", status: "Approved" },
  { tenant: "Michael Lee", property: "3 BHK Villa", status: "Rejected" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Approved":
      return "success";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

const TenantRequestsTable = () => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography fontWeight={700}>Tenant</Typography></TableCell>
            <TableCell><Typography fontWeight={700}>Property</Typography></TableCell>
            <TableCell><Typography fontWeight={700}>Status</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req, index) => (
            <TableRow key={index}>
              <TableCell>{req.tenant}</TableCell>
              <TableCell>{req.property}</TableCell>
              <TableCell>
                <Chip label={req.status} color={getStatusColor(req.status)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TenantRequestsTable;
