import React from "react";
import {
  HStack,
  Menu,
  MenuButton,
  Button,
  Avatar,
  Stack,
  MenuList,
  MenuItem,
  Text,
  StackProps,
} from "@chakra-ui/react";
import { AltArrowDownIcon } from "./icons/alt-arrow-down";
import { SeventhSenseSvg } from "./svg/seventh-sense";
import { LogoutIcon } from "./icons/logout";
import { PlusIcon } from "./icons/plus";
import { BrainSvg } from "./svg/brain";

export const Topbar = (props: StackProps) => {
  return (
    <HStack
      as="header"
      py="small"
      px="large"
      justify="space-between"
      bg="#F8F9FC"
      zIndex="1000"
      {...props}
    >
      <HStack spacing="4px">
        <BrainSvg />
        <SeventhSenseSvg />
      </HStack>

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="unstyled"
              h="fit-content"
              textAlign="start"
              fontWeight="normal"
            >
              <HStack spacing="large">
                <Avatar />

                <Stack spacing="2px" textStyle="xs">
                  <Text color="text.60">#0001</Text>
                  <Text color="text.80">Seventh Sense Demo Account</Text>
                  <Text color="text.60">demo-account@telepathdata.com</Text>
                </Stack>

                <AltArrowDownIcon
                  transform={`rotate(${isOpen ? 180 : 0}deg)`}
                  transition="ease-in-out 0.25s"
                />
              </HStack>
            </MenuButton>

            <MenuList
              bg="white"
              mt="4px"
              py="24px"
              px="16px"
              border="none"
              boxShadow="0px 15px 20px 0px rgba(0, 0, 0, 0.05)"
              borderRadius="16px"
            >
              {/* If multiple accounts */}
              {/* <MenuGroup
                title="Accounts"
                fontSize="xs"
                fontWeight="normal"
                color="text.38"
              >
                <MenuItem>Seventh Sense Demo Account</MenuItem>
              </MenuGroup>

              <MenuDivider my="12px" color="#E8ECF6" /> */}

              <MenuItem
                px="8px"
                py="4px"
                borderRadius="8px"
                _hover={{ bg: "#F8F9FC" }}
                _focusVisible={{ bg: "#F0F2F8" }}
              >
                <PlusIcon mr="8px" />
                Add account
              </MenuItem>

              <MenuItem
                mt="12px"
                px="8px"
                py="4px"
                borderRadius="8px"
                _hover={{ bg: "#F8F9FC" }}
                _focusVisible={{ bg: "#F0F2F8" }}
              >
                <LogoutIcon mr="8px" />
                Logout
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  );
};
