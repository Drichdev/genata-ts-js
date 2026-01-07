/**
 * Field-level data generation based on field type
 */

import type { FieldType, GeneratorOptions } from "../types";
import {
  PersonGenerators,
  LocationGenerators,
  InternetGenerators,
  CompanyGenerators,
  DateGenerators,
  DataTypeGenerators,
  TextGenerators,
} from "./base";

interface FieldGenerationOptions extends GeneratorOptions {
  index?: number;
}

export function generateField(
  type: FieldType,
  options?: FieldGenerationOptions
): unknown {
  const index = options?.index ?? 0;

  switch (type) {
    // Personal Information
    case "first_name":
      return PersonGenerators.firstName(options);
    case "last_name":
      return PersonGenerators.lastName(options);
    case "full_name":
      return PersonGenerators.fullName(options);
    case "email":
      return PersonGenerators.email(options);
    case "username":
      return PersonGenerators.username(options);
    case "password":
      return PersonGenerators.password(options);
    case "phone":
      return PersonGenerators.phone(options);

    // Location
    case "address":
      return LocationGenerators.address(options);
    case "city":
      return LocationGenerators.city(options);
    case "country":
      return LocationGenerators.country(options);
    case "zip":
      return LocationGenerators.zipCode(options);

    // Internet
    case "url":
      return InternetGenerators.url(options);
    case "ipv4":
      return InternetGenerators.ipv4(options);
    case "ipv6":
      return InternetGenerators.ipv6(options);
    case "credit_card":
      return InternetGenerators.creditCard(options);

    // Company
    case "company":
      return CompanyGenerators.company(options);
    case "job_title":
      return CompanyGenerators.jobTitle(options);

    // Date/Time
    case "date":
      return DateGenerators.date(options);
    case "datetime":
      return DateGenerators.dateTime(options);

    // Data Types
    case "uuid":
      return DataTypeGenerators.uuid(options);
    case "boolean":
      return DataTypeGenerators.boolean(options);
    case "int":
    case "number":
      return DataTypeGenerators.integer(options);
    case "float":
      return DataTypeGenerators.float(options);
    case "zero_one":
      return DataTypeGenerators.integer({ ...options, min: 0, max: 1 });
    case "id_increment":
      return index + 1;

    // Text
    case "paragraph":
      return TextGenerators.paragraph(options);
    case "sentence":
      return TextGenerators.sentence(options);
    case "word":
      return TextGenerators.word(options);
    case "slug":
      return TextGenerators.slug(options);
    case "color":
      return DataTypeGenerators.color(options);
    case "hex":
      return DataTypeGenerators.hex(options);

    default:
      throw new Error(`Unknown field type: ${type}`);
  }
}
