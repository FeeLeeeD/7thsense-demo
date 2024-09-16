import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
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
import { OpenRatesHeatMap } from "~components/pages/people/lead/open-rates-heatmap";
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
      description="Lead statistics"
      back
    >
      <Grid gridTemplateColumns="1fr 1fr 1fr 228px" gridGap="xlarge">
        <StatCard
          icon={<SolidClockCircleIcon />}
          name="Subscription date"
          value="03.01.2024"
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

      <Card title="Heatmap of probability of engagement" mt="xlarge">
        <OpenRatesHeatMap
          cumulativeMonthlyOpenRates={[
            0.1, 0.25, 0.3, 0.32, 0.24, 0.45, 0.6, 0.47, 0.74, 0.81, 0.88,
            0.91,
          ]}
        />
      </Card>
    </PageLayout>
  );
};

const SentEmailsList = (props: BoxProps) => {
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
        List of sent emails
      </Box>

      <TableContainer>
        <Table>
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
                date: "2024-08-01",
                opened: true,
                clicked: false,
              },
              {
                email: "Tech Trends Newsletter",
                tag: "technology",
                date: "2024-07-15",
                opened: false,
                clicked: true,
              },
              {
                email: "Summer Sale Offers",
                tag: "shopping",
                date: "2024-06-25",
                opened: true,
                clicked: true,
              },
              {
                email: "Fitness Daily Routine",
                tag: "health",
                date: "2024-08-05",
                opened: false,
                clicked: false,
              },
              {
                email: "Film Festival Updates",
                tag: "movies",
                date: "2024-07-30",
                opened: true,
                clicked: true,
              },
              {
                email: "Travel Deals Weekly",
                tag: "travel",
                date: "2024-06-12",
                opened: true,
                clicked: false,
              },
              {
                email: "Fashion Week Recap",
                tag: "fashion",
                date: "2024-09-01",
                opened: false,
                clicked: false,
              },
              {
                email: "Cooking Tips & Tricks",
                tag: "food",
                date: "2024-08-10",
                opened: true,
                clicked: true,
              },
              {
                email: "Gaming Gear Updates",
                tag: "gaming",
                date: "2024-07-05",
                opened: true,
                clicked: false,
              },
              {
                email: "Photography Insights",
                tag: "photography",
                date: "2024-09-10",
                opened: false,
                clicked: true,
              },
            ].map((item) => (
              <Tr key={item.email}>
                <Td>{item.email}</Td>
                <Td>
                  <Tag borderRadius="full"># {item.tag}</Tag>
                </Td>
                <Td>{item.date}</Td>
                <Td w="100px">
                  <HStack spacing="medium">
                    <Box
                      boxSize="20px"
                      borderRadius="full"
                      bg={item.opened ? "green.300" : "red.300"}
                    />

                    <Text>{item.opened ? "Yes" : "No"}</Text>
                  </HStack>
                </Td>
                <Td w="100px">
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
      gridColumn="4/5"
      gridRow="1/3"
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
