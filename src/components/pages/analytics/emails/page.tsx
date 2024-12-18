import React, { useState } from "react";
import { route } from "~utils/routes";
import {
  Wrap,
  WrapItem,
  Text,
  IconButton,
  HStack,
  Input,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
  TagCloseButton,
  Fade,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "~components/shared/link";
import { PageLayout } from "~components/page-layout";
import { FilterPlusIcon } from "~components/icons/filter-plus";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { FilterClearIcon } from "~components/icons/filter-clear";
import { SignPostIcon } from "~components/icons/sign-post";
import { ColumnsIcon } from "~components/icons/columns";
import { SearchIcon } from "~components/icons/search";
import { GlobalIcon } from "~components/icons/global";
import { EmailsTable } from "./table";

export const AnalyticsEmailsPage = () => {
  const [checkboxesStates, setStates] = useState<boolean[]>([]);

  return (
    <PageLayout title="Emails">
      <HStack bg="white" p="xlarge" borderRadius="24px" spacing="large">
        <Fade in={checkboxesStates.filter(Boolean).length > 1}>
          <HStack spacing="xlarge">
            <Button
              as={Link}
              variant="green"
              to={(r: typeof route) => r.analytics.emails.email()}
            >
              Statistics for emails
            </Button>

            {checkboxesStates.filter(Boolean).length > 1 && (
              <Text color="#707880" textStyle="m">
                {checkboxesStates.at(0)
                  ? 1270
                  : checkboxesStates.filter(Boolean).length}{" "}
                selected
              </Text>
            )}
          </HStack>
        </Fade>

        <Spacer />

        <InputGroup w="400px">
          <InputLeftElement h="full" pointerEvents="none">
            <SearchIcon color="#4B5259" />
          </InputLeftElement>

          <Input placeholder="Search" />
        </InputGroup>

        <IconButton
          aria-label="Column"
          variant="secondary"
          icon={<ColumnsIcon />}
          w="48px"
        />
        <IconButton aria-label="Filters" icon={<FilterPlusIcon />} w="48px" />
      </HStack>

      <Wrap w="full" my="xlarge" spacing="large">
        <WrapItem>
          <Tag variant="filter">
            <TagLeftIcon as={SolidClockCircleIcon} />
            <TagLabel>Time: last 2 months</TagLabel>
            <TagCloseButton />
          </Tag>
        </WrapItem>

        <WrapItem>
          <Tag variant="filter">
            <TagLeftIcon as={GlobalIcon} />
            <TagLabel>Domains: Telephdata</TagLabel>
            <TagCloseButton />
          </Tag>
        </WrapItem>

        <WrapItem>
          <Tag variant="filter">
            <TagLeftIcon as={SignPostIcon} />
            <TagLabel>Providers: gmail, google workspace and more</TagLabel>
            <TagCloseButton />
          </Tag>
        </WrapItem>

        <WrapItem>
          <Button
            variant="unstyled"
            h="fit-content"
            textStyle="m"
            color="#4B5259"
          >
            Reset filters
            <FilterClearIcon ml="small" />
          </Button>
        </WrapItem>
      </Wrap>

      <EmailsTable onChosenEmailsChange={setStates} />
    </PageLayout>
  );
};
