import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import {
  Box,
  Checkbox,
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

export const EmailsTable = ({
  onChosenEmailsChange,
  ...props
}: {
  onChosenEmailsChange: (states: boolean[]) => void;
} & TableContainerProps) => {
  const [states, setStates] = useState<boolean[]>([
    ...new Array(11).fill(false),
  ]);

  const onCheck = (checked: boolean, index: number) => {
    if (index === 0) {
      setStates((states) => {
        const newStates = states.map(() => checked);

        onChosenEmailsChange(newStates);
        return newStates;
      });
    } else {
      setStates((states) => {
        const newStates = [...states];
        newStates[index] = checked;

        if (newStates[0] === true) {
          newStates[0] = false;
        }

        onChosenEmailsChange(newStates);
        return newStates;
      });
    }
  };

  const openEmailStatistics = () => {
    navigate("/v2/analytics/emails/email");
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
              <Th>
                <Checkbox
                  isChecked={states[0]}
                  onChange={(e) => onCheck(e.currentTarget.checked, 0)}
                />
              </Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Campaign name</Th>
              <Th>Tags</Th>
              <Th>Sent date</Th>
              <Th textAlign="end">Progress (delivered)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, i) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox
                    isChecked={states.at(i + 1)}
                    onChange={(e) => onCheck(e.currentTarget.checked, i + 1)}
                  />
                </Td>
                <Td isNumeric onClick={openEmailStatistics}>
                  {item.id}
                </Td>
                <Td onClick={openEmailStatistics}>{item.name}</Td>
                <Td onClick={openEmailStatistics}>{item.campaignName}</Td>
                <Td onClick={openEmailStatistics}>
                  <HStack>
                    {item.tags.map((tag) => (
                      <Tag key={tag} borderRadius="full">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                </Td>
                <Td onClick={openEmailStatistics}>{item.sentDate}</Td>
                <Td onClick={openEmailStatistics}>
                  <ProgressCell progress={item.progress} />
                </Td>
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
          Page <b>1</b> of 127
        </Text>

        <Spacer />

        <Select w="fit-content" defaultValue={"10"}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
        <Text>Number of emails: 1270</Text>
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
