import React from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";
import { PageLayout } from "~components/page-layout";
import {
  Box,
  BoxProps,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { OpenRatesHeatMap } from "~components/pages/v2/people/lead/open-rates-heatmap";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { LetterOpenedIcon } from "~components/icons/letter-opened";
import { CursorClickIcon } from "~components/icons/cursor-click";
import { AltArrowDownIcon } from "~components/icons/alt-arrow-down";
import { CheckCircleIcon } from "~components/icons/check-circle";
import { Link } from "~components/link";
import { Card } from "~components/card";

export const Head: HeadFC = () => <title>Lead</title>;

const LeadPage = (props: PageProps) => {
  return (
    <PageLayout
      title="Sarah Johnson, Virginia, USA"
      description="Individual engagement statistics"
      back="/analytics/people"
    >
      <Grid
        gridTemplateColumns={{ base: "1fr 1fr 228px", lg: "1fr 1fr 1fr 228px" }}
        gridGap="xlarge"
      >
        <StatCard
          icon={<SolidClockCircleIcon />}
          name="Subscription date"
          value="01/03/2024"
        />
        <StatCard
          icon={<CheckCircleIcon />}
          name="Tags"
          value="#music, #concerts, #playlists"
        />
        <StatCard
          icon={<LetterOpenedIcon />}
          name="Engagement"
          value="Highly engaged"
        />

        <PeakEngagementTime />

        <StatCard
          icon={<CursorClickIcon />}
          name="Average Response Time"
          value="34 min"
        />
        <StatCard
          icon={<CursorClickIcon />}
          name="Today’s peak engagement time"
          value="12 AM"
        />
        <StatCard
          icon={<CursorClickIcon />}
          name="Weekly peak engagement time"
          value="Monday, 6 PM"
        />
      </Grid>

      <SentEmailsList mt="xlarge" />

      <Card title="Engagement probability over time" mt="xlarge">
        <OpenRatesHeatMap
          cumulativeMonthlyOpenRates={[
            0.1, 0.25, 0.3, 0.32, 0.24, 0.45, 0.6, 0.47, 0.74, 0.81, 0.88, 0.91,
          ]}
        />
      </Card>
    </PageLayout>
  );
};

const SentEmailsList = (props: BoxProps) => {
  const openEmailStatistics = () => {
    navigate("/v2/analytics/emails/email");
  };

  return (
    <Box as="section" {...props}>
      <Box
        as="header"
        py="large"
        fontSize="20px"
        lineHeight="28px"
        color="#343A40"
        fontWeight="semibold"
      >
        Emails sent
      </Box>

      <TableContainer>
        <Table
          sx={{
            "tr:hover td": {
              cursor: "pointer",
              bg: "#F8F9FC",
            },
          }}
        >
          <Thead>
            <Tr>
              <Th>Email subject</Th>
              <Th>Tags</Th>
              <Th>Sent date</Th>
              <Th>Opened?</Th>
              <Th>Clicked?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              {
                email: "Rock Revolution Playlist",
                tag: "music",
                date: "01/08/2024",
                opened: true,
                clicked: false,
              },
              {
                email: "Tech Trends Newsletter",
                tag: "technology",
                date: "07/15/2024",
                opened: false,
                clicked: false,
              },
              {
                email: "Summer Sale Offers",
                tag: "shopping",
                date: "06/25/2024",
                opened: true,
                clicked: true,
              },
              {
                email: "Fitness Daily Routine",
                tag: "health",
                date: "08/05/2024",
                opened: false,
                clicked: false,
              },
              {
                email: "Film Festival Updates",
                tag: "movies",
                date: "08/30/2024",
                opened: true,
                clicked: true,
              },
              {
                email: "Travel Deals Weekly",
                tag: "travel",
                date: "09/12/2024",
                opened: true,
                clicked: false,
              },
              {
                email: "Fashion Week Recap",
                tag: "fashion",
                date: "09/14/2024",
                opened: false,
                clicked: false,
              },
              {
                email: "Cooking Tips & Tricks",
                tag: "food",
                date: "09/15/2024",
                opened: true,
                clicked: true,
              },
              {
                email: "Gaming Gear Updates",
                tag: "gaming",
                date: "09/16/2024",
                opened: true,
                clicked: false,
              },
              {
                email: "Photography Insights",
                tag: "photography",
                date: "09/17/2024",
                opened: false,
                clicked: false,
              },
            ]
              .reverse()
              .map((item) => (
                <Tr key={item.email}>
                  <Td onClick={openEmailStatistics}>{item.email}</Td>
                  <Td onClick={openEmailStatistics}>
                    <Tag borderRadius="full"># {item.tag}</Tag>
                  </Td>
                  <Td onClick={openEmailStatistics}>{item.date}</Td>
                  <Td w="100px" onClick={openEmailStatistics}>
                    <HStack spacing="medium">
                      <Box
                        boxSize="20px"
                        borderRadius="full"
                        bg={item.opened ? "green.300" : "red.300"}
                      />

                      <Text>{item.opened ? "Yes" : "No"}</Text>
                    </HStack>
                  </Td>
                  <Td w="100px" onClick={openEmailStatistics}>
                    <HStack spacing="medium">
                      <Box
                        boxSize="20px"
                        borderRadius="full"
                        bg={item.clicked ? "green.300" : "red.300"}
                      />

                      <Text>{item.clicked ? "Yes" : "No"}</Text>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="flex-end">
        <Link
          to="/analytics/emails"
          rightIcon={<AltArrowDownIcon transform="rotate(-90deg)" />}
          mt="small"
        >
          Open all emails
        </Link>
      </Flex>
    </Box>
  );
};

const PeakEngagementTime = () => {
  return (
    <Box
      as="section"
      gridColumn={{ base: "3/4", lg: "4/5" }}
      gridRow={{ base: "1/4", lg: "1/3" }}
      bg="white"
      borderRadius="24px"
      px="20px"
      py="10px"
    >
      <Heading
        fontSize="14px"
        lineHeight="20px"
        fontWeight="normal"
        color="#4B5259"
      >
        <CursorClickIcon mr="small" />
        Peak engagement times
      </Heading>

      <Stack as="dl" mt="xsmall" spacing="small">
        {[
          {
            label: "Monday",
            value: "6 PM",
          },
          {
            label: "Tuesday",
            value: "7 PM",
          },
          {
            label: "Wednesday",
            value: "6 PM",
          },
          {
            label: "Thursday",
            value: "12 AM",
          },
          {
            label: "Friday",
            value: "7 AM",
          },
          {
            label: "Saturday",
            value: "12 AM",
          },
          {
            label: "Sunday",
            value: "9 AM",
          },
        ].map((item) => (
          <HStack key={item.label} justify="space-between">
            <Text as="dt" color="4B5259" textStyle="m">
              {item.label}
            </Text>
            <Text as="dd" color="#343A40" textStyle="m">
              {item.value}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
};

const StatCard = ({
  icon,
  name,
  value,
}: {
  icon: React.ReactNode;
  name: string;
  value: string;
}) => {
  return (
    <Stack
      justifySelf="stretch"
      bg="white"
      px="20px"
      py="10px"
      spacing="xsmall"
      borderRadius="24px"
    >
      <HStack spacing="small" color="#4B5259">
        {icon}

        <Text as="dt" textStyle="s">
          {name}
        </Text>
      </HStack>

      <Text as="dd" textStyle="l" fontWeight="semibold">
        {value}
      </Text>
    </Stack>
  );
};

export default LeadPage;
