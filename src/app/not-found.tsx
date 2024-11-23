"use client";

import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "98vh",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="error" sx={{ fontWeight: 600 }}>
            404
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sorry, the page not found
          </Typography>
        </Box>
      </body>
    </html>
  );
}
