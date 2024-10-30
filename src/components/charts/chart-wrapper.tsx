import React from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HeadingProps,
  HStack,
  Select,
  SelectProps,
  Text,
  TextProps,
} from "@chakra-ui/react";

type ChartWrapperProps = {
  title: string;
  description?: string;
  descriptionProps?: TextProps;
  children: React.ReactNode;
} & BoxProps;

export const ChartWrapper = ({
  title,
  description,
  descriptionProps,
  children,
  ...props
}: ChartWrapperProps) => {
  return (
    <Shared.WrapperBox {...props}>
      <Shared.HeaderBox>
        <Shared.Heading>{title}</Shared.Heading>

        {description && (
          <Shared.DescriptionText {...descriptionProps}>
            {description}
          </Shared.DescriptionText>
        )}
      </Shared.HeaderBox>

      {children}
    </Shared.WrapperBox>
  );
};

type ChartWrapperWithDropdownProps = {
  title?: string;
  options: Array<{
    title?: string;
    description?: string;
    value: string;
    label: string;
  }>;
  optionValue: string;
  onOptionValueChange: (value: string) => void;
  selectProps?: SelectProps;
  description?: string;
  descriptionProps?: TextProps;
  children: React.ReactNode;
} & BoxProps;

export const ChartWrapperWithDropdown = ({
  title,
  options,
  optionValue,
  onOptionValueChange,
  selectProps,
  description,
  descriptionProps,
  children,
  ...props
}: ChartWrapperWithDropdownProps) => {
  const chosenOptionTitle = options.find((o) => o.value === optionValue)?.title;
  const chosenOptionDescription = options.find(
    (o) => o.value === optionValue
  )?.description;

  return (
    <Shared.WrapperBox {...props}>
      <HStack justify="space-between" align="flex-start" spacing="xxlarge">
        <Shared.HeaderBox>
          <Shared.Heading>{chosenOptionTitle ?? title}</Shared.Heading>

          {(description || chosenOptionDescription) && (
            <Shared.DescriptionText {...descriptionProps}>
              {chosenOptionDescription ?? description}
            </Shared.DescriptionText>
          )}
        </Shared.HeaderBox>

        <Select
          value={optionValue}
          onChange={(e) => onOptionValueChange(e.currentTarget.value)}
          w="fit-content"
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </HStack>

      {children}
    </Shared.WrapperBox>
  );
};

const Shared = {
  WrapperBox: (props: BoxProps) => {
    return (
      <Flex
        as="section"
        flexDir="column"
        bg="white"
        borderRadius="24px"
        px="xxlarge"
        py="large"
        {...props}
      />
    );
  },

  HeaderBox: (props: BoxProps) => {
    return <Box as="header" mb="xxlarge" {...props} />;
  },

  Heading: (props: HeadingProps) => {
    return (
      <Heading
        fontSize="24px"
        fontWeight="semibold"
        color="#343A40"
        {...props}
      />
    );
  },

  DescriptionText: (props: TextProps) => {
    return <Text mt="8px" color="#707880" textStyle="s" {...props} />;
  },
};
