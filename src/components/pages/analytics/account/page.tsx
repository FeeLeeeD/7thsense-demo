import React, { useRef, useState } from "react";
import { PageLayout } from "~components/page-layout";
import {
  Grid,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  WrapItem,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  ModalProps,
  FormLabel,
  FormControl,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Button,
  Collapse,
  Skeleton,
} from "@chakra-ui/react";
import { FilterPlusIcon } from "~components/icons/filter-plus";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { useTabs } from "~hooks/useTabs";
import { DeliverabilityVisibilityTab_conditional } from "./tabs/deliverability-visibility-tab";
import { ContactsEngagementTab } from "./tabs/contacts-engagement-tab";
import { AudienceReachTab } from "./tabs/audience-reach-tab";
import { AudienceAnalyticsTab_conditional } from "./tabs/audience-analytics-tab";
import { GlobalIcon } from "~components/icons/global";
import { SignPostIcon } from "~components/icons/sign-post";
import { PlusIcon } from "~components/icons/plus";
import { ConditionalComponent } from "~components/conditional-component";

export const AccountAnalyticsPage = () => {
  const { tabs, defaultTabIndex, onTabChange } = useTabs({
    tabs: [
      {
        key: "deliverability-visibility",
        title: ConditionalComponent({
          v1: "Deliverability visibility",
          v2: "Delivery insights",
          fallback: <Skeleton w="180px" h="18px" borderRadius="full" />,
        }),
        body: <DeliverabilityVisibilityTab_conditional />,
      },
      {
        key: "audience-reach",
        title: "Audience reach",
        body: <AudienceReachTab />,
      },
      {
        key: "individual-engagement",
        title: "Engagement insights",
        body: <ContactsEngagementTab />,
      },
      {
        key: "audience-analytics",
        title: "Audience conversion",
        body: <AudienceAnalyticsTab_conditional />,
      },
    ],
  });

  const [filters, setFilters] = useState<
    Array<{ type: FilterType; value: string }>
  >([]);
  const onAddFilters = (type: FilterType, filters: string[]) => {
    setFilters(filters.map((f) => ({ type, value: f })));
  };

  return (
    <PageLayout title="Account">
      <Grid
        gridTemplateColumns="auto 48px"
        gridGap="xlarge"
        bg="white"
        p="xlarge"
        borderRadius="24px"
      >
        <Wrap alignSelf="center">
          {filters.length > 0 ? (
            filters.map((filter, i) => (
              <WrapItem key={i}>
                <Tag variant="filter">
                  <TagLeftIcon
                    as={
                      {
                        date: SolidClockCircleIcon,
                        domains: GlobalIcon,
                        providers: SignPostIcon,
                      }[filter.type]
                    }
                  />
                  <TagLabel>
                    {filter.type}:{" "}
                    {filter.value
                      .split(":")
                      .map((word) => {
                        if (word === "include") return "";
                        return word;
                      })
                      .join(" ")}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() =>
                      setFilters((filters) => filters.filter((_, j) => j !== i))
                    }
                  />
                </Tag>
              </WrapItem>
            ))
          ) : (
            <WrapItem>
              <Text color="#707880" textStyle="s">
                No filters active
              </Text>
            </WrapItem>
          )}
        </Wrap>

        <Filters onAddFilters={onAddFilters} />
      </Grid>

      <Tabs
        mt="xlarge"
        defaultIndex={defaultTabIndex}
        onChange={onTabChange}
        isLazy
      >
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.key}>{tab.title}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.key}>{tab.body}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </PageLayout>
  );
};

type FilterType = "date" | "domains" | "providers";
const Filters = ({
  onAddFilters,
}: {
  onAddFilters: (type: FilterType, filters: string[]) => void;
}) => {
  const modal = useDisclosure();
  const type = useRef<FilterType>();

  const openModal = (t: FilterType) => {
    type.current = t;
    modal.onOpen();
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Filters"
          icon={<FilterPlusIcon />}
          w="48px"
        />

        <MenuList bg="white" p="0" borderRadius="16px" overflow="hidden">
          {[
            {
              icon: <GlobalIcon />,
              label: "Domains",
              onClick: () => openModal("domains"),
            },
            {
              icon: <SolidClockCircleIcon />,
              label: "Date",
              onClick: () => openModal("date"),
              isDisabled: true,
            },
            {
              icon: <SignPostIcon />,
              label: "Providers",
              onClick: () => openModal("providers"),
              isDisabled: true,
            },
          ].map((item, i) => (
            <MenuItem
              key={i}
              px="medium"
              py="10px"
              color="#4B5259"
              _hover={{ bg: "#F8F9FC" }}
              _focusVisible={{ bg: "#F0F2F8" }}
              isDisabled={item.isDisabled}
              onClick={item.onClick}
            >
              <HStack spacing="small" sx={{ svg: { boxSize: "20px" } }}>
                {item.icon}
                <Text textStyle="m">{item.label}</Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {modal.isOpen && type.current && (
        <FilterModal
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          type={type.current}
          onAddFilters={onAddFilters}
        />
      )}
    </>
  );
};

const FilterModal = ({
  type,
  onAddFilters,
  ...props
}: {
  type: FilterType;
  onAddFilters: (type: FilterType, filters: string[]) => void;
} & Omit<ModalProps, "children">) => {
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState("include");

  const [filters, setFilters] = useState<string[]>([]);

  const onAdd = () => {
    const filter = `${condition}: ${value}`;
    if (!value || filters.includes(filter)) return;
    setFilters((filters) => {
      return [...filters, filter];
    });
    setValue("");
  };

  const onRemove = (filter: string) => {
    setFilters((filters) => filters.filter((f) => f !== filter));
  };

  return (
    <Modal {...props}>
      <ModalOverlay bg="rgba(9, 9, 9, 0.20)" />
      <ModalContent minW="552px">
        <ModalHeader>Filter by {type}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing="large">
            <RadioGroup onChange={setCondition} value={condition}>
              <Stack spacing="large">
                <Radio value="include">Include</Radio>
                <Radio value="exclude">Exclude</Radio>
              </Stack>
            </RadioGroup>

            <FormControl>
              <FormLabel mb="xsmall" ml="medium" textStyle="m" color="#4B5259">
                Domains
              </FormLabel>

              <HStack>
                <Input
                  placeholder="E.g. telepathdata.com"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && onAdd()}
                />
                <IconButton
                  aria-label="Set domain"
                  icon={<PlusIcon />}
                  w="48px"
                  flexShrink={0}
                  isDisabled={value.length === 0}
                  onClick={onAdd}
                />
              </HStack>
            </FormControl>
          </Stack>

          <Collapse in={filters.length > 0}>
            <Wrap mt="large" spacingX="large" spacingY="small">
              {filters.map((filter, i) => (
                <WrapItem key={i}>
                  <Tag variant="filter">
                    {filter.split(":").map((word, i) => {
                      if (i === 0)
                        return (
                          <Text as="b" mr="xsmall">
                            {word}:
                          </Text>
                        );
                      return word;
                    })}
                    <TagCloseButton onClick={() => onRemove(filter)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Collapse>
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Button
            leftIcon={<FilterPlusIcon />}
            isDisabled={filters.length === 0}
            onClick={() => {
              onAddFilters(type, filters);
              props.onClose();
              setFilters([]);
            }}
          >
            Add filter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
