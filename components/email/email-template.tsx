import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Row,
  Column,
} from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({
  firstName,
  email,
  message,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>New Inquiry from {firstName} via BhavMedia</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={brandText}>BhavMedia</Text>
        </Section>
        
        <Section style={contentSection}>
          <Heading style={h1}>New Contact Message</Heading>
          <Section style={infoCard}>
            <Row style={infoRow}>
              <Column style={labelCol}>
                <Text style={label}>SENDER</Text>
                <Text style={value}>{firstName}</Text>
              </Column>
              <Column style={labelCol}>
                <Text style={label}>EMAIL ADDRESS</Text>
                <Text style={value}>
                  <Link href={`mailto:${email}`} style={link}>{email}</Link>
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={messageSection}>
            <Text style={label}>MESSAGE CONTENT</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Sent from the BhavMedia Contact System
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

// STYLING

const main = {
  backgroundColor: "#f4f4f7",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  padding: "0",
  width: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden" as const,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const headerSection = {
  backgroundColor: "#1a1a1a",
  padding: "20px",
  textAlign: "center" as const,
};

const brandText = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "0",
};

const contentSection = {
  padding: "40px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.1",
  margin: "0 0 15px",
};

const introText = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#4a4a4a",
  margin: "0 0 30px",
};

const infoCard = {
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  padding: "20px",
  border: "1px solid #eeeeee",
};

const infoRow = {
  paddingBottom: "4px",
};

const labelCol = {
  width: "50%",
};

const label = {
  fontSize: "10px",
  fontWeight: "bold" as const,
  color: "#8898aa",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const value = {
  fontSize: "14px",
  color: "#333333",
  margin: "0",
  fontWeight: "500" as const,
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const messageSection = {
  margin: "0",
};

const messageBox = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#333333",
  whiteSpace: "pre-wrap" as const,
  padding: "15px",
  backgroundColor: "#ffffff",
  borderLeft: "4px solid #1a1a1a",
  marginTop: "10px",
};

const footer = {
  textAlign: "center" as const,
  padding: "30px 0",
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  margin: "0",
};