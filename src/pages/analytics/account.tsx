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
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import { FilterPlusIcon } from "~components/icons/filter-plus";
import { SolidClockCircleIcon } from "~components/icons/solid-clock-circle";
import { useTabs } from "../../hooks/useTabs";
import { DeliverabilityVisibilityTab } from "~components/pages/account/tabs/deliverability-visibility-tab";
import { ContactsEngagementTab } from "~components/pages/account/tabs/contacts-engagement-tab";
import { AudienceReachTab } from "~components/pages/account/tabs/audience-reach-tab";
import { AudienceAnalyticsTab } from "~components/pages/account/tabs/audience-analytics-tab";

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

        <IconButton aria-label="Filters" icon={<FilterPlusIcon />} w="48px" />
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

export default AccountAnalyticsPage;
