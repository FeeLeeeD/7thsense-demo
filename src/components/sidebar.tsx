import React, { createContext, useContext, useState } from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  Text,
  Button,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Spacer,
  List,
  ListItem,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { UsersGroupTwoRoundedIcon } from "./icons/users-group-two-rounded";
import { HamburgerMenuIcon } from "./icons/hamburger-menu";
import { CrownStarIcon } from "./icons/crown-star";
import { FileTextIcon } from "./icons/file-text";
import { SettingsIcon } from "./icons/settings";
import { WidgetIcon } from "./icons/widget";
import { LetterIcon } from "./icons/letter";
import { CaseIcon } from "./icons/case";

type SidebarContent = { sidebarOpened: boolean; toggleSidebar: () => void };
const SidebarContext = createContext<SidebarContent>({
  sidebarOpened: false,
  toggleSidebar: () => ({}),
});
const useSidebarContext = () => useContext<SidebarContent>(SidebarContext);

export const Sidebar = () => {
  const sidebar = useDisclosure({ defaultIsOpen: true });

  return (
    <SidebarContext.Provider
      value={{ sidebarOpened: sidebar.isOpen, toggleSidebar: sidebar.onToggle }}
    >
      <Stack
        as="aside"
        pos="sticky"
        top="68px"
        w={sidebar.isOpen ? "288px" : "100px"}
        h="calc(100vh - 68px)"
        transition="width ease-in-out 0.3s"
        p="large"
        spacing="xlarge"
        bg="#F0F2F8"
      >
        <Group
          title="Analytics"
          menu={[
            {
              href: "/analytics/account",
              icon: <FileTextIcon />,
              label: "Account",
            },
            {
              href: "/analytics/emails",
              icon: <LetterIcon />,
              label: "Emails",
            },
            {
              href: "/analytics/people",
              icon: <UsersGroupTwoRoundedIcon />,
              label: "People",
            },
          ]}
        />

        {/* Disabled items */}
        <Group
          title="Tasks"
          menu={[
            {
              icon: <CaseIcon />,
              label: "Jobs",
            },
            {
              icon: <WidgetIcon />,
              label: "Widgets",
            },
          ]}
        />

        <Group
          title="Account"
          menu={[
            {
              icon: <CrownStarIcon />,
              label: "Services",
            },
            {
              icon: <SettingsIcon />,
              label: "Settings",
            },
          ]}
        />

        <Spacer />

        <Menu>
          <MenuButton
            as={Button}
            variant="unstyled"
            textAlign="start"
            fontWeight="normal"
            p="small"
            textStyle="m"
            _hover={{ bg: "#F8F9FC" }}
          >
            <HStack spacing="large">
              <HamburgerMenuIcon
                transform={sidebar.isOpen ? "none" : "translateX(13.5px)"}
                transition="ease-in-out 0.25s"
              />
              <Text
                visibility={sidebar.isOpen ? "visible" : "hidden"}
                opacity={sidebar.isOpen ? 1 : 0}
                transition="ease-in-out 0.25s"
              >
                More
              </Text>
            </HStack>
          </MenuButton>

          <MenuList
            bg="white"
            py="24px"
            px="16px"
            border="none"
            boxShadow="0px 15px 20px 0px rgba(0, 0, 0, 0.05)"
            borderRadius="16px"
          >
            <MenuItem
              px="8px"
              py="4px"
              borderRadius="8px"
              _hover={{ bg: "#F8F9FC" }}
              _focusVisible={{ bg: "#F0F2F8" }}
            >
              Switch color mode
            </MenuItem>

            <MenuItem
              mt="12px"
              px="8px"
              py="4px"
              borderRadius="8px"
              _hover={{ bg: "#F8F9FC" }}
              _focusVisible={{ bg: "#F0F2F8" }}
              onClick={sidebar.onToggle}
            >
              {sidebar.isOpen ? "Hide" : "Open"} sidebar
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </SidebarContext.Provider>
  );
};

type GroupProps = {
  title: string;
  menu: Array<{
    icon: React.ReactNode;
    label: string;
    href?: string;
  }>;
};

const Group = ({ title, menu }: GroupProps) => {
  const { sidebarOpened } = useSidebarContext();

  return (
    <Box as="nav" aria-label={`${title} navigation`}>
      <Text
        textStyle={sidebarOpened ? "s" : "xs"}
        fontWeight="semibold"
        color="#23272B"
        w="fit-content"
        ml={sidebarOpened ? 0 : "50%"}
        transform={`translateX(${sidebarOpened ? 0 : "-50%"})`}
        transition={`ease-in-out ${sidebarOpened ? "0.15s" : "0.25s"} ${
          sidebarOpened ? "0s" : "0.3s"
        }`}
      >
        {title}
      </Text>

      <List mt="small" spacing="small">
        {menu.map((item, i) => {
          const Component = item.href ? Link : Button;

          return (
            <ListItem key={i}>
              <Component
                {...(item.href
                  ? {
                      as: GatsbyLink,
                      to: item.href,
                    }
                  : {
                      fontWeight: "normal",
                      isDisabled: true,
                    })}
                w="full"
                display="inline-block"
                p="small"
                borderRadius="8px"
                color="#4B5259"
                bg={
                  item.href &&
                  typeof window !== "undefined" &&
                  window.location.href.includes(item.href)
                    ? "#D9DDEA"
                    : "none"
                }
                _hover={{ bg: "#F8F9FC", color: "#343A40" }}
                _focusVisible={{
                  bg: "#F8F9FC",
                  boxShadow: "outline",
                  color: "#343A40",
                }}
              >
                <HStack spacing="large" flex={1}>
                  <Box
                    transform={sidebarOpened ? "none" : "translateX(13.5px)"}
                    transition="ease-in-out 0.25s"
                  >
                    {item.icon}
                  </Box>
                  <Text
                    visibility={sidebarOpened ? "visible" : "hidden"}
                    opacity={sidebarOpened ? 1 : 0}
                    transition="ease-in-out 0.25s"
                  >
                    {item.label}
                  </Text>
                </HStack>
              </Component>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
