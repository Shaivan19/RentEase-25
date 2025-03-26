import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Avatar,
  Stack,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";

const requests = [
  {
    tenant: "John Doe",
    property: "2 BHK Apartment",
    status: "Pending",
    date: "2024-03-25",
    avatar: "JD",
  },
  {
    tenant: "Alice Smith",
    property: "Studio Apartment",
    status: "Approved",
    date: "2024-03-24",
    avatar: "AS",
  },
  {
    tenant: "Michael Lee",
    property: "3 BHK Villa",
    status: "Rejected",
    date: "2024-03-23",
    avatar: "ML",
  },
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

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <PendingIcon />;
    case "Approved":
      return <CheckCircleIcon />;
    case "Rejected":
      return <CancelIcon />;
    default:
      return null;
  }
};

const TenantRequestsTable = () => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 0,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                Tenant
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                Property
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                Date
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                Status
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req, index) => (
            <TableRow
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 32,
                      height: 32,
                      fontSize: "0.875rem",
                    }}
                  >
                    {req.avatar}
                  </Avatar>
                  <Typography variant="body2" fontWeight={500}>
                    {req.tenant}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {req.property}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(req.date).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={req.status}
                    color={getStatusColor(req.status)}
                    size="small"
                    icon={getStatusIcon(req.status)}
                    sx={{
                      borderRadius: 1,
                      "& .MuiChip-icon": {
                        fontSize: 16,
                      },
                    }}
                  />
                  {req.status === "Pending" && (
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Approve">
                        <IconButton size="small" color="success">
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton size="small" color="error">
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TenantRequestsTable;
