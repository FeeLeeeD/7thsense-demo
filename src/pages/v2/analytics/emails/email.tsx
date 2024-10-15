import React from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";
import { PageLayout } from "~components/page-layout";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Stack,
  StackProps,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { LetterOpenedIcon } from "~components/icons/letter-opened";
import { CursorClickIcon } from "~components/icons/cursor-click";
import { BounceRateIcon } from "~components/icons/bounce-rate";
import { UserPlusIcon } from "~components/icons/user-plus";
import { UserSpeakRoundedIcon } from "~components/icons/user-speark-rounded";
import { SolidUsersGroupTwoRoundedIcon } from "~components/icons/solid-users-group-two-rounded";
import { PlaceOfEngagementMap } from "~components/pages/v2/emails/email/place-of-engagement-map";
import { TimeOfEngagementChart } from "~components/pages/v2/emails/email/time-of-engagement";
import { AltArrowDownIcon } from "~components/icons/alt-arrow-down";
import { Link } from "~components/link";
import { Card } from "~components/card";

export const Head: HeadFC = () => <title>Email</title>;

const EmailPage = (props: PageProps) => {
  return (
    <PageLayout title="Email statistics" back="/analytics/emails">
      <Grid gridTemplateColumns={{ lg: "repeat(12, 1fr)" }} gridGap="xlarge">
        <StatCard
          icon={<SolidClockCircleIcon />}
          name="Delivered"
          value={new Intl.NumberFormat().format(56000)}
          gridColumn="1 / 4"
        />
        <StatCard
          icon={<LetterOpenedIcon />}
          name="Open rate"
          value="35%"
          gridColumn="4 / 7"
        />
        <StatCard
          icon={<CursorClickIcon />}
          name="Click rate"
          value="6%"
          gridColumn="7 / 10"
        />
        <StatCard
          icon={<BounceRateIcon />}
          name="Bounce rate"
          value="0.5%"
          gridColumn="10 / 13"
        />
        <StatCard
          icon={<SolidUsersGroupTwoRoundedIcon />}
          name="Unique people delivered"
          value={new Intl.NumberFormat().format(35000)}
          gridColumn="1 / 5"
          gridRow="2 / 3"
        />
        <StatCard
          icon={<UserPlusIcon />}
          name="Unique people open rate"
          value="51%"
          gridColumn="5 / 9"
          gridRow="2 / 3"
        />
        <StatCard
          icon={<UserSpeakRoundedIcon />}
          name="Unique people click rate"
          value="9%"
          gridColumn="9 / 13"
          gridRow="2 / 3"
        />
      </Grid>

      <Grid
        mt="xlarge"
        gridTemplateColumns={{ lg: "1fr 1fr" }}
        gridGap="xlarge"
      >
        <Card title="Place of engagement">
          <PlaceOfEngagementMap />
        </Card>

        <TopEngagedContacts />
      </Grid>

      <Card title="Time of engagement" mt="xlarge">
        <TimeOfEngagementChart />
      </Card>
    </PageLayout>
  );
};

const TopEngagedContacts = () => {
  const openLeadStatistics = () => {
    navigate("/v2/analytics/people/lead");
  };

  return (
    <Box as="section">
      <Box
        as="header"
        py="large"
        fontSize="20px"
        lineHeight="28px"
        color="#343A40"
        fontWeight="semibold"
      >
        Top engaged contacts
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
              <Th>Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Engagement score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              {
                name: "Sarah Johnson",
                email: "sarah.j@email.com",
                score: 95,
              },
              {
                name: "John Smith",
                email: "john.s@email.com",
                score: 88,
              },
              {
                name: "Emily Davis",
                email: "emily.d@email.com",
                score: 92,
              },
              {
                name: "Michael Brown",
                email: "michael.b@email.com",
                score: 85,
              },
              {
                name: "Jessica Wilson",
                email: "jessica.w@email.com",
                score: 96,
              },
              {
                name: "Daniel Lee",
                email: "daniel.l@email.com",
                score: 89,
              },
              {
                name: "Sophia Martinez",
                email: "sophia.m@email.com",
                score: 91,
              },
              {
                name: "James White",
                email: "james.w@email.com",
                score: 87,
              },
            ].map((item) => (
              <Tr key={item.name}>
                <Td onClick={openLeadStatistics}>{item.name}</Td>
                <Td onClick={openLeadStatistics}>{item.email}</Td>
                <Td
                  w="fit-content"
                  fontFamily="monospace"
                  textAlign="end"
                  onClick={openLeadStatistics}
                >
                  {item.score}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="flex-end">
        <Link
          to="/analytics/people"
          rightIcon={<AltArrowDownIcon transform="rotate(-90deg)" />}
          mt="small"
        >
          Open all people
        </Link>
      </Flex>
    </Box>
  );
};

const StatCard = ({
  icon,
  name,
  value,
  ...props
}: {
  icon: React.ReactNode;
  name: string;
  value: string;
} & StackProps) => {
  return (
    <Stack
      bg="white"
      px="20px"
      py="10px"
      spacing="xsmall"
      borderRadius="24px"
      {...props}
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

export default EmailPage;
