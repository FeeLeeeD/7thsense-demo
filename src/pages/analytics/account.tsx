import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { PageLayout } from "../../components/page-layout";
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
} from "@chakra-ui/react";
import { FilterPlusIcon } from "~components/icons/filter-plus";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { useTabs } from "../../hooks/useTabs";
import { DeliverabilityVisibilityTab } from "~components/pages/account/tabs/deliverability-visibility-tab";
import { ContactsEngagementTab } from "~components/pages/account/tabs/contacts-engagement-tab";
import { AudienceReachTab } from "~components/pages/account/tabs/audience-reach-tab";
import { AudienceAnalyticsTab } from "~components/pages/account/tabs/audience-analytics-tab";
import { GlobalIcon } from "~components/icons/global";
import { SignPostIcon } from "~components/icons/sign-post";

export const Head: HeadFC = () => <title>Account analytics</title>;

const AccountAnalyticsPage = (props: PageProps) => {
  const { tabs, defaultTabIndex, onTabChange } = useTabs({
    tabs: [
      {
        key: "deliverability-visibility",
        title: "Deliverability visibility",
        body: <DeliverabilityVisibilityTab />,
      },
      {
        key: "audience-reach",
        title: "Audience reach",
        body: <AudienceReachTab />,
      },
      {
        key: "individual-engagement",
        title: "Individual Engagement",
        body: <ContactsEngagementTab />,
      },
      {
        key: "audience-analytics",
        title: "Audience analytics",
        body: <AudienceAnalyticsTab />,
      },
    ],
  });

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
          <WrapItem>
            <Text color="#707880" textStyle="s">
              No filters active
            </Text>
          </WrapItem>
          {/* <WrapItem>
            <Tag variant="filter">
              <TagLeftIcon as={SolidClockCircleIcon} />
              <TagLabel> Time: last 2 months</TagLabel>
              <TagCloseButton />
            </Tag>
          </WrapItem> */}
        </Wrap>

        <Filters />
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

const Filters = () => {
  const dateModal = useDisclosure();

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
              icon: <SolidClockCircleIcon />,
              label: "Date",
              onClick: dateModal.onOpen,
            },
            {
              icon: <GlobalIcon />,
              label: "Domains",
              onClick: dateModal.onOpen,
            },
            {
              icon: <SignPostIcon />,
              label: "Providers",
              onClick: dateModal.onOpen,
            },
          ].map((item, i) => (
            <MenuItem
              key={i}
              px="medium"
              py="10px"
              color="#4B5259"
              _hover={{ bg: "#F8F9FC" }}
              _focusVisible={{ bg: "#F0F2F8" }}
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

      {dateModal.isOpen && (
        <Modal isOpen={dateModal.isOpen} onClose={dateModal.onClose}>
          <ModalOverlay bg="rgba(9, 9, 9, 0.20)" />
          <ModalContent>
            <ModalHeader>Filter by date</ModalHeader>
            <ModalCloseButton />
            <ModalBody>body</ModalBody>

            <ModalFooter />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AccountAnalyticsPage;
