import React from "react";
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
import { DashboardIcon } from "./icons/dashboard";
import { FileTextIcon } from "./icons/file-text";
import { SettingsIcon } from "./icons/settings";
import { WidgetIcon } from "./icons/widget";
import { LetterIcon } from "./icons/letter";
import { CaseIcon } from "./icons/case";

export const Sidebar = () => {
  const sidebar = useDisclosure({ defaultIsOpen: true });

  return (
    <Stack
      as="aside"
      role="navigation"
      aria-label="Navigation"
      w={sidebar.isOpen ? "288px" : "100px"}
      transition="width ease-in-out 0.25s"
      p="large"
      spacing="small"
      bg="#F0F2F8"
      h="full"
    >
      <HStack
        spacing="large"
        p="small"
        bg="#D9DDEA"
        borderRadius="8px"
        overflow="hidden"
      >
        <DashboardIcon
          transform={sidebar.isOpen ? "none" : "translateX(13.5px)"}
          transition="ease-in-out 0.25s"
        />
        <Text
          visibility={sidebar.isOpen ? "visible" : "hidden"}
          opacity={sidebar.isOpen ? 1 : 0}
          transition="ease-in-out 0.25s"
        >
          Analytics
        </Text>
      </HStack>

      {/* Main links */}
      <List spacing="small">
        {[
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
            href: "/analytics/leads",
            icon: <UsersGroupTwoRoundedIcon />,
            label: "Leads",
          },
        ].map((item, i) => (
          <ListItem key={i}>
            <Link
              as={GatsbyLink}
              to={item.href}
              w="full"
              display="inline-block"
              py="small"
              pl="xxlarge"
              pr="small"
              borderRadius="8px"
              _hover={{ bg: "#F8F9FC" }}
              _focusVisible={{ bg: "#F8F9FC", boxShadow: "outline" }}
            >
              <HStack spacing="large" flex={1}>
                {item.icon}
                <Text
                  visibility={sidebar.isOpen ? "visible" : "hidden"}
                  opacity={sidebar.isOpen ? 1 : 0}
                  transition="ease-in-out 0.25s"
                >
                  {item.label}
                </Text>
              </HStack>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* Disabled buttons */}
      {[
        {
          icon: <CaseIcon />,
          label: "Jobs",
        },
        {
          icon: <WidgetIcon />,
          label: "Widgets",
        },
        {
          icon: <CrownStarIcon />,
          label: "Services",
        },
        {
          icon: <SettingsIcon />,
          label: "Settings",
        },
      ].map((item, i) => (
        <Button
          key={i}
          variant="unstyled"
          fontWeight="normal"
          display="inline-block"
          p="small"
          borderRadius="8px"
          _hover={{ bg: "#F8F9FC" }}
          _focusVisible={{ bg: "#F8F9FC", boxShadow: "outline" }}
          isDisabled
        >
          <HStack spacing="large" flex={1}>
            <Box
              transform={sidebar.isOpen ? "none" : "translateX(13.5px)"}
              transition="ease-in-out 0.25s"
            >
              {item.icon}
            </Box>
            <Text
              visibility={sidebar.isOpen ? "visible" : "hidden"}
              opacity={sidebar.isOpen ? 1 : 0}
              transition="ease-in-out 0.25s"
            >
              {item.label}
            </Text>
          </HStack>
        </Button>
      ))}

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
  );
};
