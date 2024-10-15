import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import {
  Box,
  CircularProgress,
  HStack,
  IconButton,
  Select,
  Spacer,
  Table,
  TableContainer,
  TableContainerProps,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "~components/icons/arrow-left";
import { ArrowRightIcon } from "~components/icons/arrow-right";
import { data } from "./data";

export const PeopleTable = ({ ...props }: TableContainerProps) => {
  const openLeadStatistics = () => {
    navigate("/v2/analytics/people/lead");
  };

  return (
    <Box>
      <TableContainer overflowY="visible" overflowX="visible" {...props}>
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
              <Th>Subscription date</Th>
              <Th>Location</Th>
              <Th>Tags</Th>
              <Th>Engagement</Th>
              <Th>Latency</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.reverse().map((item) => (
              <Tr key={item.id}>
                <Td onClick={openLeadStatistics}>{item.name}</Td>
                <Td onClick={openLeadStatistics}>{item.email}</Td>
                <Td onClick={openLeadStatistics}>{item.subscriptionDate}</Td>
                <Td onClick={openLeadStatistics}>{item.location}</Td>
                <Td onClick={openLeadStatistics}>
                  <HStack>
                    {item.tags.map((tag) => (
                      <Tag key={tag} borderRadius="full">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                </Td>
                <Td onClick={openLeadStatistics}>{item.engagement}</Td>
                <Td onClick={openLeadStatistics}>{item.art}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack
        mt="xlarge"
        bg="white"
        borderRadius="24px"
        px="xlarge"
        py="large"
        spacing="xlarge"
      >
        <IconButton
          variant="unstyled"
          color="#4B5259"
          icon={<ArrowLeftIcon />}
          aria-label="previous page"
        />
        <IconButton
          variant="unstyled"
          color="#4B5259"
          icon={<ArrowRightIcon />}
          aria-label="next page"
        />
        <Text>
          Page <b>1</b> of 13489
        </Text>

        <Spacer />

        <Select w="fit-content" defaultValue={"10"}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
        <Text>Number of emails: 134889</Text>
      </HStack>
    </Box>
  );
};

const ProgressCell = ({
  progress,
}: {
  progress: {
    count: number;
    percent: number;
  };
}) => {
  const [circularValue, setCircularValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCircularValue(progress.percent);
    }, 250);
  }, []);

  return (
    <HStack spacing="xsmall" justify="flex-end">
      <Text>
        {new Intl.NumberFormat().format(progress.count)} – {progress.percent}%
      </Text>

      <CircularProgress
        size="24px"
        thickness="16px"
        trackColor="#D4F1D9"
        color="#09951E"
        value={circularValue}
        sx={{
          circle: {
            strokeLinecap: "round",
          },
        }}
      />
    </HStack>
  );
};
