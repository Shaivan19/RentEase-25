import { Container, Typography, Paper, Box } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to RentEase! By using our platform, you agree to comply with the following terms and conditions.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">1. User Agreement</Typography>
          <Typography variant="body2" paragraph>
            By creating an account and using RentEase, you confirm that all information provided is accurate. You are responsible
            for maintaining confidentiality of your account details.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">2. Property Listings</Typography>
          <Typography variant="body2" paragraph>
            Landlords are solely responsible for the accuracy of their property listings. RentEase does not verify the legitimacy of listings.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">3. Payment and Transactions</Typography>
          <Typography variant="body2" paragraph>
            All financial transactions are handled through secure third-party gateways. RentEase is not liable for disputes between tenants and landlords.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">4. Prohibited Activities</Typography>
          <Typography variant="body2" paragraph>
            Users must not engage in fraudulent activities, misrepresentation, or illegal practices on the platform.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">5. Termination of Use</Typography>
          <Typography variant="body2" paragraph>
            RentEase reserves the right to suspend or terminate accounts violating these terms without prior notice.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">6. Changes to Terms</Typography>
          <Typography variant="body2" paragraph>
            We may update these terms at any time. Continued use of RentEase after updates implies acceptance of the new terms.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">7. Privacy Policy</Typography>
          <Typography variant="body2" paragraph>
            Your personal information is protected according to our Privacy Policy. By using RentEase, you consent to our data collection practices.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">8. Liability Disclaimer</Typography>
          <Typography variant="body2" paragraph>
            RentEase is not responsible for any direct or indirect damages resulting from the use of the platform.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">9. Third-Party Links</Typography>
          <Typography variant="body2" paragraph>
            RentEase may contain links to third-party websites. We do not endorse or take responsibility for their content or policies.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">10. Governing Law</Typography>
          <Typography variant="body2" paragraph>
            These terms are governed by the laws of India. Any disputes will be resolved under the jurisdiction of Indian courts.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
