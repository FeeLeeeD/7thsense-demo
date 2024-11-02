import React from "react";
import { PageLayout } from "~components/page-layout";
import {
  HStack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Wrap,
  WrapItem,
  Tag,
  TagLeftIcon,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { ColumnsIcon } from "~components/icons/columns";
import { FilterClearIcon } from "~components/icons/filter-clear";
import { FilterPlusIcon } from "~components/icons/filter-plus";
import { GlobalIcon } from "~components/icons/global";
import { SearchIcon } from "~components/icons/search";
import { SignPostIcon } from "~components/icons/sign-post";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { PeopleTable } from "./table";

export const AnalyticsPeoplePage = () => {
  return (
    <PageLayout title="People">
      <HStack bg="white" p="xlarge" borderRadius="24px" spacing="large">
        <InputGroup>
          <InputLeftElement h="full" pointerEvents="none">
            <SearchIcon color="#4B5259" />
          </InputLeftElement>

          <Input placeholder="Search" />
        </InputGroup>

        <IconButton
          flexShrink={0}
          aria-label="Column"
          variant="secondary"
          icon={<ColumnsIcon />}
          w="48px"
        />
        <IconButton
          flexShrink={0}
          aria-label="Filters"
          icon={<FilterPlusIcon />}
          w="48px"
        />
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

      <PeopleTable />
    </PageLayout>
  );
};
