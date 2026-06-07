type Auth = {
    kind: "apiKey";
    apiKey: string;
} | {
    kind: "bearer";
    token: string;
} | {
    kind: "none";
};
type HttpClientOptions = {
    baseUrl: string;
    auth: Auth;
    fetchFn?: typeof fetch;
    userAgent?: string;
};
declare class HttpClient {
    private readonly baseUrl;
    private readonly fetchFn;
    private readonly userAgent;
    private auth;
    constructor(opts: HttpClientOptions);
    setAuth(auth: Auth): void;
    request<TResponse>(opts: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        path: string;
        query?: Record<string, string | number | boolean | null | undefined>;
        body?: unknown;
    }): Promise<TResponse>;
}

interface components {
    schemas: {
        /**
         * AddressCreate
         * @description Address creation model for B2B consumers.
         */
        AddressCreate: {
            /**
             * Address Line 1
             * @description Address line 1 (building number, street name)
             */
            address_line_1: string;
            /** @description Address line 2 (district) */
            address_line_2?: string | null;
            /**
             * City
             * @description City
             */
            city: string;
            /** @description Postal code */
            postal_code?: string | null;
            /**
             * Country
             * @description Country
             */
            country: string;
        };
        /**
         * AddressResponse
         * @description Address response model.
         */
        AddressResponse: {
            /**
             * Address Line 1
             * @description Address line 1
             */
            address_line_1?: string;
            /** @description Address line 2 */
            address_line_2?: string | null;
            /**
             * City
             * @description City
             */
            city?: string;
            /** @description Postal code */
            postal_code?: string | null;
            /**
             * Country
             * @description Country
             */
            country?: string;
        };
        /** AutoChargeOnDemandResponse */
        AutoChargeOnDemandResponse: {
            /**
             * Payment Id
             * Format: uuid
             * @description ID of the payment that was charged
             */
            payment_id?: string;
            /**
             * Invoice Id
             * Format: uuid
             * @description ID of the invoice associated with the payment
             */
            invoice_id?: string;
        };
        /** BaseConsumerResponse */
        BaseConsumerResponse: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            id?: string;
            /**
             * Name
             * @description Name of the consumer
             */
            name?: string;
            /**
             * Format: phone
             * @description Phone number of the consumer
             */
            phone_number?: string | null;
            /**
             * Format: email
             * @description Email address of the consumer
             */
            email?: string | null;
            /** @description External identifier for the consumer */
            external_id?: string | null;
            /** @description Consumer information */
            consumer?: components["schemas"]["app__consumer__v2__dtos__Consumer"];
            /** @description IBAN (International Bank Account Number) of the consumer */
            iban?: string | null;
            /**
             * Is Deleted
             * @description Whether the consumer has been deleted
             */
            is_deleted?: boolean;
            /** @description Alias of the consumer */
            alias?: string | null;
            /**
             * Created At
             * Format: date-time
             * @description Date and time when the consumer was created
             */
            created_at?: string;
            /** @description Branch information for this consumer */
            branch?: components["schemas"]["Branch"];
            /** @description Additional comments or notes about the consumer */
            comment?: string | null;
            /**
             * Communication Methods
             * @description Preferred communication methods for the consumer
             */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][];
            /** @description Preferred language of the consumer */
            preferred_language?: components["schemas"]["Language"];
            /** @description Consumer type: individual or business */
            consumer_type?: components["schemas"]["OrganizationConsumerType"];
            /** @description National address (required for business type) */
            address?: components["schemas"]["AddressResponse"];
            /** @description VAT number (optional for business type) */
            vat_number?: string | null;
            /** @description Commercial registration number (optional for business type) */
            commercial_registration?: string | null;
        };
        /** Branch */
        Branch: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the branch
             */
            id?: string;
            /**
             * Name
             * @description Name of the branch
             */
            name?: string;
        };
        /** BranchDto */
        BranchDto: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the branch
             */
            id?: string;
            /**
             * Name
             * @description Name of the branch
             */
            name?: string;
        };
        /** BranchItem */
        BranchItem: {
            /**
             * Id
             * Format: uuid4
             */
            id?: string;
            /** Name */
            name?: string;
            user_count?: number | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
        };
        /** BranchListResponse */
        BranchListResponse: {
            /** Data */
            data?: components["schemas"]["BranchItem"][];
        };
        /**
         * ConsumerCommunicationMethod
         * @enum {string}
         */
        ConsumerCommunicationMethod: "WHATSAPP" | "EMAIL" | "SMS";
        /**
         * ConsumerCreate
         * @description Consumer creation model.
         */
        ConsumerCreate: {
            /**
             * Name
             * @description Consumer name
             */
            name: string;
            /**
             * Format: phone
             * @description Phone number
             */
            phone_number?: string | null;
            /**
             * Format: email
             * @description Email address
             */
            email?: string | null;
            /** @description External ID */
            external_id?: string | null;
            /**
             * IBAN
             * @description IBAN
             */
            iban?: string | null;
            /** @description Alias */
            alias?: string | null;
            /** @description Comment */
            comment?: string | null;
            /** @description Preferred language */
            preferred_language?: components["schemas"]["Language"];
            /** @description Communication methods */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
            /**
             * @description Consumer type: individual or business
             * @default INDIVIDUAL
             */
            consumer_type: components["schemas"]["OrganizationConsumerType"];
            /** @description Address (required for business type) */
            address?: components["schemas"]["AddressCreate"];
            /** @description VAT number (optional for business type) */
            vat_number?: string | null;
            /** @description Commercial registration number (optional for business type) */
            commercial_registration?: string | null;
        };
        /** ConsumerResponse */
        ConsumerResponse: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            id?: string;
            /**
             * Name
             * @description Name of the consumer
             */
            name?: string;
            /**
             * Format: phone
             * @description Phone number of the consumer
             */
            phone_number?: string | null;
            /**
             * Format: email
             * @description Email address of the consumer
             */
            email?: string | null;
            /** @description External identifier for the consumer */
            external_id?: string | null;
            /** @description Consumer information */
            consumer?: components["schemas"]["app__consumer__v2__dtos__Consumer"];
            /** @description IBAN (International Bank Account Number) of the consumer */
            iban?: string | null;
            /**
             * Is Deleted
             * @description Whether the consumer has been deleted
             */
            is_deleted?: boolean;
            /** @description Alias of the consumer */
            alias?: string | null;
            /**
             * Created At
             * Format: date-time
             * @description Date and time when the consumer was created
             */
            created_at?: string;
            /** @description Branch information for this consumer */
            branch?: components["schemas"]["Branch"];
            /** @description Additional comments or notes about the consumer */
            comment?: string | null;
            /**
             * Communication Methods
             * @description Preferred communication methods for the consumer
             */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][];
            /** @description Preferred language of the consumer */
            preferred_language?: components["schemas"]["Language"];
            /** @description Consumer type: individual or business */
            consumer_type?: components["schemas"]["OrganizationConsumerType"];
            /** @description National address (required for business type) */
            address?: components["schemas"]["AddressResponse"];
            /** @description VAT number (optional for business type) */
            vat_number?: string | null;
            /** @description Commercial registration number (optional for business type) */
            commercial_registration?: string | null;
            /** @description Information about the most recent invoice activity for this consumer */
            last_invoice_activity?: components["schemas"]["LastInvoiceActivity"];
        };
        /**
         * ConsumerUpdate
         * @description Consumer update model with all fields optional.
         */
        ConsumerUpdate: {
            /** @description Consumer name */
            name?: string | null;
            /**
             * Format: phone
             * @description Phone number
             */
            phone_number?: string | null;
            /**
             * Format: email
             * @description Email address
             */
            email?: string | null;
            /** @description External ID */
            external_id?: string | null;
            /**
             * IBAN
             * @description IBAN
             */
            iban?: string | null;
            /** @description Alias */
            alias?: string | null;
            /** @description Comment */
            comment?: string | null;
            /** @description Preferred language */
            preferred_language?: components["schemas"]["Language"];
            /** @description Communication methods */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
            /** @description Consumer type: individual or business */
            consumer_type?: components["schemas"]["OrganizationConsumerType"];
            /** @description Address (required for business type) */
            address?: components["schemas"]["AddressCreate"];
            /** @description VAT number (optional for business type) */
            vat_number?: string | null;
            /** @description Commercial registration number (optional for business type) */
            commercial_registration?: string | null;
        };
        /**
         * ContactInformationType
         * @enum {string}
         */
        ContactInformationType: "PHONE" | "EMAIL";
        /** CouponCalculationMetadataDto */
        CouponCalculationMetadataDto: {
            /**
             * Coupons
             * @description List of coupons applied and their calculation details
             */
            coupons?: components["schemas"]["CouponMetadataDto"][];
        };
        /** CouponCreate */
        CouponCreate: {
            /**
             * Name
             * @description Name of the coupon.
             */
            name: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value: number | string;
            /** @description Currency code for fixed-amount coupons (required when is_percentage=false). Must be null when is_percentage=true. Must be one of the supported currency codes. */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             * @default false
             */
            is_percentage: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is active upon creation.
             * @default true
             */
            is_active: boolean;
        };
        /** CouponDetailed */
        CouponDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the coupon
             */
            id?: string;
            /**
             * Name
             * @description Name of the coupon.
             */
            name?: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value?: string;
            /** @description Currency code for fixed-amount coupons (e.g. SAR). Null for percentage coupons. */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             */
            is_percentage?: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is currently active.
             */
            is_active?: boolean;
            /**
             * Redemptions
             * @description Indicates how many times this coupon has been used.
             */
            redemptions?: number;
        };
        /** CouponDto */
        CouponDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the coupon
             */
            id?: string;
            /**
             * Name
             * @description Name of the coupon.
             */
            name?: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value?: string;
            /** @description Currency code for fixed-amount coupons (e.g. SAR). Null for percentage coupons. */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             */
            is_percentage?: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is currently active.
             */
            is_active?: boolean;
        };
        /** CouponMetadataDto */
        CouponMetadataDto: {
            /**
             * Coupon Id
             * @description Unique identifier of the coupon
             */
            coupon_id?: string;
            /**
             * Name
             * @description Name of the coupon
             */
            name?: string;
            /**
             * Is Percentage
             * @description Whether the discount is a percentage or fixed amount
             */
            is_percentage?: boolean;
            /**
             * Discount Value
             * @description Discount value (percentage or fixed amount)
             */
            discount_value?: string;
            /** @description Currency code for fixed-amount coupons (e.g., SAR, USD). Null for percentage coupons. */
            currency?: string | null;
            /**
             * Order
             * @description Order in which the coupon was applied
             */
            order?: number;
            /**
             * Amount Before Discount
             * @description Amount before applying this coupon
             */
            amount_before_discount?: string;
            /**
             * Discount Amount
             * @description Discount amount applied by this coupon
             */
            discount_amount?: string;
            /**
             * Amount After Discount
             * @description Amount after applying this coupon
             */
            amount_after_discount?: string;
        };
        /** CouponUpdate */
        CouponUpdate: {
            /** @description Updated name of the coupon. */
            name?: string | null;
            /**
             * Discount Value
             * @description Updated discount value (either percentage or fixed).
             */
            discount_value?: number | string | null;
            /** @description Currency code for fixed-amount coupons. Null for percentage coupons. */
            currency?: components["schemas"]["CurrencyCode"];
            /** @description True if the discount is a percentage, False if it is a fixed amount. */
            is_percentage?: boolean | null;
            /** @description Whether the coupon should be active or inactive. */
            is_active?: boolean | null;
        };
        /** CreateBranchRequest */
        CreateBranchRequest: {
            /**
             * Name
             * @description Branch name. Must be unique within the organization.
             */
            name: string;
        };
        /** CreatePaymentLinkDto */
        CreatePaymentLinkDto: {
            /**
             * Name
             * @description Name of the payment link
             */
            name: string;
            /** @description Optional description of the payment link */
            description?: string | null;
            /**
             * @description Currency for the payment link (e.g. SAR, USD). All products must have a price in this currency.
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /**
             * Items
             * @description List of products to include in the payment link
             */
            items: components["schemas"]["CreatePaymentLinkItemDto"][];
            /**
             * Coupons
             * @description List of coupon UUIDs to apply at the payment link level for discounts
             */
            coupons?: string[];
            /** @description Maximum number of times this payment link can be used. If null, the payment link can be used unlimited times. If organization_consumer_id is set, this number becomes how many times that specific customer can pay. Typically this should be set to 1 in that scenario. */
            max_number_of_payments?: number | null;
            /**
             * Format: date-time
             * @description Datetime after which the payment link is no longer valid. If no timezone is specified, UTC is assumed.
             */
            valid_until?: string | null;
            /** @description Optional message to display to the payer after successful payment */
            confirmation_message?: string | null;
            /** @description Configure which payment methods are available. If null, organization defaults are used. Note: Installments are always disabled for recurring products (subscriptions). */
            payment_methods?: components["schemas"]["PaymentMethodDto"];
            /** @description Free trial duration (in days) for subscriptions created from this link. Only valid when the link contains recurring (subscription) products. Must be between 1 and 365. Omit (or null) for no trial. */
            trial_period_days?: number | null;
            /**
             * properties
             * @description JSON Schema (https://json-schema.org/specification) to define and validate fields collected from payers during payment. Only string type properties allowed.
             * @example {
             *       "properties": {
             *         "child_name": {
             *           "title": "Child Name",
             *           "type": "string"
             *         },
             *         "parent_email": {
             *           "title": "Parent Email",
             *           "type": "string"
             *         }
             *       },
             *       "required": [
             *         "child_name"
             *       ],
             *       "type": "object"
             *     }
             */
            custom_fields?: Record<string, never> | null;
            /**
             * Format: uri
             * @description URL to redirect the payer to after a successful payment
             */
            success_redirect_url?: string | null;
            /**
             * Format: uri
             * @description URL to redirect the payer to after a failed payment
             */
            failure_redirect_url?: string | null;
            /**
             * Format: uuid
             * @description ID of an existing consumer who will pay using this payment link. If set, customer information is not collected and this payment will be for that customer only. This is typically used when a specific customer is paying once. If not set, the link will collect customer information first. Use this when you expect multiple payments from different people, such as for a group trip or event.
             */
            organization_consumer_id?: string | null;
            /** @description Optional key-value metadata dictionary for attaching custom information. This metadata will be included as-is in payment link responses and webhook payloads. */
            custom_metadata?: {
                [key: string]: components["schemas"]["JsonValue"];
            } | null;
            /** @description Type of contact information required for payment collection. Defaults to PHONE if not specified. */
            contact_information_type?: components["schemas"]["ContactInformationType"];
        };
        /** CreatePaymentLinkItemDto */
        CreatePaymentLinkItemDto: {
            /**
             * Product Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the product to include in the payment link
             */
            product_id: string;
            /**
             * Quantity
             * @description Quantity of the product. Must be at least 1.
             * @default 1
             */
            quantity: number;
            /**
             * Coupons
             * @description List of coupon UUIDs to apply to this specific item for discounts
             */
            coupons?: string[];
            /**
             * Allow Custom Quantity
             * @description Whether customers can select custom quantity for this item
             * @default false
             */
            allow_custom_quantity: boolean;
            /** @description Minimum quantity allowed if allow_custom_quantity is True; value is inclusive */
            min_quantity?: number | null;
            /** @description Maximum quantity allowed if allow_custom_quantity is True; value is inclusive */
            max_quantity?: number | null;
        };
        /**
         * CurrencyCode
         * @description ISO 4217 currency codes supported by Moyasar.
         *
         *     Includes all currencies supported by Moyasar payment gateway.
         * @enum {string}
         */
        CurrencyCode: "SAR" | "USD" | "EUR" | "GBP" | "AED" | "BHD" | "KWD" | "OMR" | "QAR";
        /** FreezeSubscriptionBase */
        FreezeSubscriptionBase: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Freeze Start Datetime
             * Format: date-time
             */
            freeze_start_datetime?: string;
            /** Format: date-time */
            freeze_end_datetime?: string | null;
            notes?: string | null;
            /**
             * Subscription Id
             * Format: uuid
             */
            subscription_id?: string;
            /**
             * Invoice Id
             * Format: uuid
             */
            invoice_id?: string;
            duration?: number | null;
        };
        /** FreezeSubscriptionCreateRequest */
        FreezeSubscriptionCreateRequest: {
            /**
             * Freeze Start Datetime
             * Format: date-time
             * @description Start date and time when the subscription freeze period begins
             */
            freeze_start_datetime: string;
            /**
             * Format: date-time
             * @description End date and time when the subscription freeze period ends. If not provided, the freeze will continue indefinitely until manually removed.
             */
            freeze_end_datetime?: string | null;
            /** @description Optional notes explaining the reason for the freeze */
            notes?: string | null;
        };
        /** FreezeSubscriptionUpdateRequest */
        FreezeSubscriptionUpdateRequest: {
            /**
             * Freeze Start Datetime
             * Format: date-time
             * @description freeze_start_datetime is always provided even if it dont change
             */
            freeze_start_datetime: string;
            /**
             * Format: date-time
             * @description freeze_end_datetime is optional, if provided, it must be greater than freeze_start_datetime
             */
            freeze_end_datetime: string | null;
            /** @description Optional notes explaining the reason for the freeze */
            notes?: string | null;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /**
         * InvoiceBase
         * @description Base invoice response DTO.
         *
         *     Multi-Currency Support:
         *     - `currency`: The currency code for the invoice (e.g., SAR, USD, EUR)
         *     - `home_currency_amount`: Total amount converted to home currency (SAR) for reporting
         *     - `home_currency_amount_actual`: Actual settled amount in home currency after payment
         *     - `exchange_rate_at_creation`: Exchange rate used at invoice creation time (for audit)
         *
         *     For SAR invoices, `home_currency_amount` equals `total_amount` and `exchange_rate_at_creation` is 1.
         */
        InvoiceBase: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the invoice
             */
            id?: string;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment link if invoice was created from one
             */
            payment_link_id?: string | null;
            /**
             * User Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the user who created the invoice
             */
            user_id?: string;
            /**
             * Organization Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization
             */
            organization_id?: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            organization_consumer_id?: string;
            /**
             * Account Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the account
             */
            account_id?: string;
            /**
             * Branch Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the branch
             */
            branch_id?: string;
            /**
             * Org Invoice Number
             * @description Organization-specific invoice number
             */
            org_invoice_number?: number;
            /** @description Description of the invoice */
            description?: string | null;
            /**
             * Total Amount
             * @description Total invoice amount after discounts (in invoice currency)
             */
            total_amount?: string;
            /**
             * Original Amount
             * @description Original invoice amount before discounts (in invoice currency)
             */
            original_amount?: string;
            /**
             * Item Level Discounted Amount
             * @description Total amount discounted at the item level
             */
            item_level_discounted_amount?: string;
            /** @description Total VAT amount calculated from products */
            total_vat_amount?: string | null;
            /** @description Total price excluding VAT */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /**
             * @description Currency code for the invoice (e.g., SAR, USD, EUR)
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /** @description Total in home currency (SAR) for reporting. Equals total_amount for SAR invoices. */
            home_currency_amount?: string | null;
            /** @description Actual settled amount in home currency (SAR) after payment processing. */
            home_currency_amount_actual?: string | null;
            /** @description Exchange rate used at invoice creation time (for audit). 1 for SAR invoices. */
            exchange_rate_at_creation?: string | null;
            /** @description Message to display to the consumer */
            consumer_message?: string | null;
            /** @description Current status of the invoice */
            status?: components["schemas"]["InvoiceStatusEnum"];
            /** @description Payment method for the invoice */
            payment_method?: components["schemas"]["PaymentMethodEnum"];
            /** @description Allowed payment flow for the invoice */
            allowed_payment_flow?: components["schemas"]["PaymentFlow"];
            /** @description Current payment flow being used */
            current_payment_flow?: components["schemas"]["PaymentFlow"];
            /**
             * Format: date-time
             * @description Start date and time of the billing period
             */
            period_start?: string | null;
            /**
             * Format: date-time
             * @description End date and time of the billing period
             */
            period_end?: string | null;
            /** @description Billing cycle interval if this is a recurring invoice */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /** @description Number of intervals per billing cycle for recurring invoices */
            recurring_interval_count?: number | null;
            /** @description Type of invoice */
            type?: components["schemas"]["InvoiceType"];
            /**
             * Total Amount In Smallest Unit
             * @description Total invoice amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly total_amount_in_smallest_unit?: number;
            /**
             * Original Amount In Smallest Unit
             * @description Original invoice amount (before discounts) in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
        };
        /**
         * InvoiceCreate
         * @description DTO for creating a new invoice.
         *
         *     Multi-Currency Support:
         *     - The `currency` field is optional and defaults to 'SAR' for backward compatibility.
         *     - When a currency is specified, products must have a price in that currency.
         *     - If no ProductPrice exists for the currency, falls back to product.price (legacy).
         */
        InvoiceCreate: {
            /**
             * Notify Consumer
             * @description Whether to send a notification to the consumer about the invoice
             * @default true
             */
            notify_consumer: boolean;
            /** @description Invoice description or notes */
            description?: string | null;
            /**
             * Items
             * @description List of products or services to include in the invoice
             */
            items: components["schemas"]["InvoiceItemCreateDto"][];
            /** @description Payment methods allowed for this invoice */
            payment_methods: components["schemas"]["InvoicePaymentMethodDto"];
            /** @description List of coupon UUIDs to apply for discounts */
            coupons?: string[] | null;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description UUID of the consumer who will pay this invoice
             */
            organization_consumer_id: string;
            /**
             * Scheduled On
             * Format: date-time
             * @description Payment due date. After this date, the invoice will be marked as overdue
             */
            scheduled_on: string;
            /**
             * Exclude Coupons If Installments
             * @description If enabled, all coupons (invoice-level and item-level) will be excluded when the payer chooses installments. The payer will need to pay the full amount without discounts when paying by installments.
             * @default false
             */
            exclude_coupons_if_installments: boolean;
            /**
             * @description Currency for the invoice. Defaults to SAR for backward compatibility.
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
        };
        /** InvoiceDetailed */
        InvoiceDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the invoice
             */
            id?: string;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment link if invoice was created from one
             */
            payment_link_id?: string | null;
            /**
             * User Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the user who created the invoice
             */
            user_id?: string;
            /**
             * Organization Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization
             */
            organization_id?: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            organization_consumer_id?: string;
            /**
             * Account Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the account
             */
            account_id?: string;
            /**
             * Branch Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the branch
             */
            branch_id?: string;
            /**
             * Org Invoice Number
             * @description Organization-specific invoice number
             */
            org_invoice_number?: number;
            /** @description Description of the invoice */
            description?: string | null;
            /**
             * Total Amount
             * @description Total invoice amount after discounts (in invoice currency)
             */
            total_amount?: string;
            /**
             * Original Amount
             * @description Original invoice amount before discounts (in invoice currency)
             */
            original_amount?: string;
            /**
             * Item Level Discounted Amount
             * @description Total amount discounted at the item level
             */
            item_level_discounted_amount?: string;
            /** @description Total VAT amount calculated from products */
            total_vat_amount?: string | null;
            /** @description Total price excluding VAT */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /**
             * @description Currency code for the invoice (e.g., SAR, USD, EUR)
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /** @description Total in home currency (SAR) for reporting. Equals total_amount for SAR invoices. */
            home_currency_amount?: string | null;
            /** @description Actual settled amount in home currency (SAR) after payment processing. */
            home_currency_amount_actual?: string | null;
            /** @description Exchange rate used at invoice creation time (for audit). 1 for SAR invoices. */
            exchange_rate_at_creation?: string | null;
            /** @description Message to display to the consumer */
            consumer_message?: string | null;
            /** @description Current status of the invoice */
            status?: components["schemas"]["InvoiceStatusEnum"];
            /** @description Payment method for the invoice */
            payment_method?: components["schemas"]["PaymentMethodEnum"];
            /** @description Allowed payment flow for the invoice */
            allowed_payment_flow?: components["schemas"]["PaymentFlow"];
            /** @description Current payment flow being used */
            current_payment_flow?: components["schemas"]["PaymentFlow"];
            /**
             * Format: date-time
             * @description Start date and time of the billing period
             */
            period_start?: string | null;
            /**
             * Format: date-time
             * @description End date and time of the billing period
             */
            period_end?: string | null;
            /** @description Billing cycle interval if this is a recurring invoice */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /** @description Number of intervals per billing cycle for recurring invoices */
            recurring_interval_count?: number | null;
            /** @description Type of invoice */
            type?: components["schemas"]["InvoiceType"];
            /**
             * Invoice Number
             * @description Global unique invoice number
             */
            invoice_number?: number;
            /**
             * Remaining Amount
             * @description Remaining amount to be paid
             */
            remaining_amount?: string;
            /**
             * Paid Amount
             * @description Total amount already paid
             */
            paid_amount?: string;
            /**
             * Exclude Coupons If Installments
             * @description Whether coupons are excluded when paying by installments
             */
            exclude_coupons_if_installments?: boolean;
            /** @description Consumer information for this invoice */
            organization_consumer?: components["schemas"]["app__common__dtos__shared__OrganizationConsumer"];
            /**
             * Items
             * @description List of items included in the invoice
             */
            items?: components["schemas"]["InvoiceItemDto"][];
            /** @description Branch information for this invoice */
            branch?: components["schemas"]["BranchDto"];
            /**
             * Payments
             * @description List of payments associated with this invoice
             */
            payments?: components["schemas"]["PaymentDto"][];
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription if this invoice is part of a subscription
             */
            subscription_id?: string | null;
            /** @description Subscription details if this invoice is part of a subscription */
            subscription?: components["schemas"]["SubscriptionDetailed"];
            /** @description Payment methods available for this invoice */
            payment_methods?: components["schemas"]["InvoicePaymentMethodDto"];
            /** @description Recurrence pattern for recurring invoices */
            recurrence_pattern?: components["schemas"]["RecurrencePattern"];
            /**
             * Format: uuid4
             * @description Parent invoice ID for recurring invoices
             */
            parent_id?: string | null;
            /** @description Answers to custom fields collected for this invoice */
            custom_field_answers?: {
                [key: string]: unknown;
            } | null;
            /**
             * Url
             * @description URL to access the invoice
             */
            url?: string;
            /**
             * Total Amount In Smallest Unit
             * @description Total invoice amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly total_amount_in_smallest_unit?: number;
            /**
             * Original Amount In Smallest Unit
             * @description Original invoice amount (before discounts) in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
            /**
             * Remaining Amount In Smallest Unit
             * @description Remaining amount in smallest currency unit.
             */
            readonly remaining_amount_in_smallest_unit?: number;
            /**
             * Paid Amount In Smallest Unit
             * @description Paid amount in smallest currency unit.
             */
            readonly paid_amount_in_smallest_unit?: number;
        };
        /**
         * InvoiceInPlaceUpdate
         * @description DTO for partial in-place updates to invoice fields.
         *
         *     This DTO allows updating specific fields of an invoice without requiring all fields.
         *     Only the fields provided will be updated. All fields are optional.
         *
         *     Note: This endpoint performs in-place updates, unlike the full update endpoint
         *     which cancels and recreates the invoice. Use this for simple field updates.
         */
        InvoiceInPlaceUpdate: {
            /**
             * Format: date-time
             * @description The scheduled payment date for the invoice. After this date, the invoice will be considered overdue. Must be a future date.
             */
            scheduled_on?: string | null;
            /** @description Description of the invoice. Provides additional context or details about the invoice. Must be between 1 and 512 characters if provided. */
            description?: string | null;
        };
        /** InvoiceItemCreateDto */
        InvoiceItemCreateDto: {
            /**
             * Product Id
             * Format: uuid4
             * @description UUID of the product to include
             */
            product_id: string;
            /**
             * Quantity
             * @description Quantity of the product
             */
            quantity: number;
            /** @description List of coupon UUIDs to apply for discounts on this specific item */
            coupons?: string[] | null;
        };
        /**
         * InvoiceItemDto
         * @description Invoice item response DTO.
         *
         *     Multi-Currency Support:
         *     - `currency`: The currency code for this item (e.g., SAR, USD)
         *     - `unit_price`: Snapshotted price at invoice creation (for historical accuracy)
         *     - `product_price_id`: Reference to the ProductPrice used (for traceability)
         */
        InvoiceItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the invoice item
             */
            id?: string;
            /**
             * Product Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the product
             */
            product_id?: string;
            /** @description Product details for this invoice item */
            product?: components["schemas"]["ProductDto"];
            /**
             * Quantity
             * @description Quantity of the product in this invoice item
             */
            quantity?: number;
            /**
             * Original Amount
             * @description Original amount before discounts
             */
            original_amount?: string;
            /**
             * Discounted Amount
             * @description Amount after discounts are applied
             */
            discounted_amount?: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /**
             * @description Currency code for this item (e.g., SAR, USD)
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /** @description Snapshotted unit price at invoice creation (for historical accuracy) */
            unit_price?: string | null;
            /**
             * Format: uuid4
             * @description Reference to the ProductPrice used for this item (for traceability)
             */
            product_price_id?: string | null;
            /**
             * Original Amount In Smallest Unit
             * @description Original item amount in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
            /**
             * Discounted Amount In Smallest Unit
             * @description Discounted item amount in smallest currency unit.
             */
            readonly discounted_amount_in_smallest_unit?: number;
        };
        /** InvoiceListItem */
        InvoiceListItem: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the invoice
             */
            id?: string;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment link if invoice was created from one
             */
            payment_link_id?: string | null;
            /**
             * User Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the user who created the invoice
             */
            user_id?: string;
            /**
             * Organization Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization
             */
            organization_id?: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            organization_consumer_id?: string;
            /**
             * Account Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the account
             */
            account_id?: string;
            /**
             * Branch Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the branch
             */
            branch_id?: string;
            /**
             * Org Invoice Number
             * @description Organization-specific invoice number
             */
            org_invoice_number?: number;
            /** @description Description of the invoice */
            description?: string | null;
            /**
             * Total Amount
             * @description Total invoice amount after discounts (in invoice currency)
             */
            total_amount?: string;
            /**
             * Original Amount
             * @description Original invoice amount before discounts (in invoice currency)
             */
            original_amount?: string;
            /**
             * Item Level Discounted Amount
             * @description Total amount discounted at the item level
             */
            item_level_discounted_amount?: string;
            /** @description Total VAT amount calculated from products */
            total_vat_amount?: string | null;
            /** @description Total price excluding VAT */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /**
             * @description Currency code for the invoice (e.g., SAR, USD, EUR)
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /** @description Total in home currency (SAR) for reporting. Equals total_amount for SAR invoices. */
            home_currency_amount?: string | null;
            /** @description Actual settled amount in home currency (SAR) after payment processing. */
            home_currency_amount_actual?: string | null;
            /** @description Exchange rate used at invoice creation time (for audit). 1 for SAR invoices. */
            exchange_rate_at_creation?: string | null;
            /** @description Message to display to the consumer */
            consumer_message?: string | null;
            /** @description Current status of the invoice */
            status?: components["schemas"]["InvoiceStatusEnum"];
            /** @description Payment method for the invoice */
            payment_method?: components["schemas"]["PaymentMethodEnum"];
            /** @description Allowed payment flow for the invoice */
            allowed_payment_flow?: components["schemas"]["PaymentFlow"];
            /** @description Current payment flow being used */
            current_payment_flow?: components["schemas"]["PaymentFlow"];
            /**
             * Format: date-time
             * @description Start date and time of the billing period
             */
            period_start?: string | null;
            /**
             * Format: date-time
             * @description End date and time of the billing period
             */
            period_end?: string | null;
            /** @description Billing cycle interval if this is a recurring invoice */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /** @description Number of intervals per billing cycle for recurring invoices */
            recurring_interval_count?: number | null;
            /** @description Type of invoice */
            type?: components["schemas"]["InvoiceType"];
            /** @description Remaining amount to be paid */
            remaining_amount?: string | null;
            /**
             * Paid Amount
             * @description Total amount already paid
             */
            paid_amount?: string;
            /** @description Consumer information for this invoice */
            organization_consumer?: components["schemas"]["app__common__dtos__shared__OrganizationConsumer"];
            /** @description Subscription information if this invoice is part of a subscription */
            subscription?: components["schemas"]["InvoiceListSubscrptionDto"];
            /** @description List of payments associated with this invoice */
            payments?: components["schemas"]["PaymentDto"][] | null;
            /**
             * Total Number Of Payments
             * @description Total number of payments for this invoice
             */
            total_number_of_payments?: number;
            /**
             * Format: date-time
             * @description The date when the last payment was paid
             */
            last_payment_paid_at?: string | null;
            /**
             * Total Amount In Smallest Unit
             * @description Total invoice amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly total_amount_in_smallest_unit?: number;
            /**
             * Original Amount In Smallest Unit
             * @description Original invoice amount (before discounts) in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
            /** @description Remaining amount in smallest currency unit. */
            remaining_amount_in_smallest_unit?: number | null;
            /**
             * Paid Amount In Smallest Unit
             * @description Paid amount in smallest currency unit.
             */
            readonly paid_amount_in_smallest_unit?: number;
        };
        /** InvoiceListSubscrptionDto */
        InvoiceListSubscrptionDto: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription
             */
            id?: string;
            /** @description Billing cycle interval */
            recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"];
            /**
             * Recurring Interval Count
             * @description Number of intervals per billing cycle
             */
            recurring_interval_count?: number;
            /** @description Current status of the subscription */
            status?: components["schemas"]["SubscriptionStatus"];
            /**
             * Current Period Start
             * Format: date-time
             * @description Start date and time of the current billing period
             */
            current_period_start?: string;
            /**
             * Format: date-time
             * @description End date and time of the current billing period
             */
            current_period_end?: string | null;
            /**
             * Cancel At Period End
             * @description Whether the subscription will be canceled at the end of the current period
             */
            cancel_at_period_end?: boolean;
        };
        /** InvoicePaymentMethodDto */
        InvoicePaymentMethodDto: {
            /**
             * Mada
             * @description Enable Mada payment method
             */
            mada: boolean;
            /**
             * Visa
             * @description Enable Visa payment method
             */
            visa: boolean;
            /**
             * Mastercard
             * @description Enable Mastercard payment method
             */
            mastercard: boolean;
            /**
             * Amex
             * @description Enable American Express payment method
             */
            amex: boolean;
            /**
             * Bank Transfer
             * @description Enable bank transfer payment method
             */
            bank_transfer: boolean;
            /**
             * Installment
             * @description Enable installment payment option
             */
            installment: boolean;
            /**
             * Qurrah
             * @description Enable Qurrah payment method
             * @default false
             */
            qurrah: boolean;
        };
        /**
         * InvoiceStatusEnum
         * @description Invoice status enum representing the lifecycle/state of an invoice.
         *
         *     Status describes the current stage of an invoice in its lifecycle (DRAFT → CREATED → SENT → ACCEPTED → COMPLETED).
         *     This changes over time as the invoice progresses. Different from InvoiceType which describes the payment structure.
         * @enum {string}
         */
        InvoiceStatusEnum: "DRAFT" | "CREATED" | "SENT" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELED" | "EXPIRED";
        /**
         * InvoiceType
         * @description Invoice type enum representing the payment structure/pattern of an invoice.
         *
         *     Type describes how the invoice is structured for payments (ONE_OFF, RECURRING, INSTALLMENTS, etc.).
         *     This is determined at invoice creation and typically doesn't change. Different from InvoiceStatusEnum
         *     which describes the current lifecycle state of the invoice.
         * @enum {string}
         */
        InvoiceType: "ONE_OFF" | "ONE_OFF_FUTURE" | "RECURRING" | "INSTALLMENTS" | "PRORATION";
        JsonValue: unknown;
        /**
         * Language
         * @enum {string}
         */
        Language: "AR" | "EN";
        /** LastInvoiceActivity */
        LastInvoiceActivity: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the invoice
             */
            id?: string;
            /**
             * Org Invoice Number
             * @description Organization-specific invoice number
             */
            org_invoice_number?: number;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription if applicable
             */
            subcription_id?: string | null;
        };
        /** ListResource[ConsumerResponse] */
        ListResource_ConsumerResponse_: {
            /** Data */
            data?: components["schemas"]["ConsumerResponse"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[CouponDetailed] */
        ListResource_CouponDetailed_: {
            /** Data */
            data?: components["schemas"]["CouponDetailed"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[FreezeSubscriptionBase] */
        ListResource_FreezeSubscriptionBase_: {
            /** Data */
            data?: components["schemas"]["FreezeSubscriptionBase"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[InvoiceListItem] */
        ListResource_InvoiceListItem_: {
            /** Data */
            data?: components["schemas"]["InvoiceListItem"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[PaymentLinkDetailed] */
        ListResource_PaymentLinkDetailed_: {
            /** Data */
            data?: components["schemas"]["PaymentLinkDetailed"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[PaymentResponse] */
        ListResource_PaymentResponse_: {
            /** Data */
            data?: components["schemas"]["PaymentResponse"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[ProductDto] */
        ListResource_ProductDto_: {
            /** Data */
            data?: components["schemas"]["ProductDto"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /** ListResource[SubscriptionDetailed] */
        ListResource_SubscriptionDetailed_: {
            /** Data */
            data?: components["schemas"]["SubscriptionDetailed"][];
            pagination?: components["schemas"]["Pagination"];
        };
        /**
         * MeOrganizationInfo
         * @description Organization information for /me endpoint.
         */
        MeOrganizationInfo: {
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /** Name */
            name?: string;
            name_en?: string | null;
            /** Sandbox */
            sandbox?: boolean;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
            currency_config?: components["schemas"]["OrganizationCurrencyConfigDTO"];
        };
        /**
         * MeResponse
         * @description Response for /me endpoint.
         */
        MeResponse: {
            user?: components["schemas"]["MeUserInfo"];
            organization?: components["schemas"]["MeOrganizationInfo"];
        };
        /**
         * MeUserInfo
         * @description User information for /me endpoint.
         */
        MeUserInfo: {
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /** Email */
            email?: string;
            /** First Name */
            first_name?: string;
            /** Last Name */
            last_name?: string;
            en_first_name?: string | null;
            en_last_name?: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
        };
        /**
         * MultiplePaymentsInTransactionErrorResponse
         * @description Error response for payment refund operations when multiple payments are in a single transaction.
         */
        MultiplePaymentsInTransactionErrorResponse: {
            error?: components["schemas"]["StreamError"];
            /**
             * Payment Ids
             * @description List of payment IDs that were paid in the same transaction
             */
            payment_ids?: string[];
            /**
             * Total Amount
             * @description Total amount of all payments in the transaction
             */
            total_amount?: string;
        };
        /**
         * NextInvoicePreview
         * @description The first invoice that will be issued under the new plan, fully precomputed.
         */
        NextInvoicePreview: {
            /**
             * Period Start
             * Format: date-time
             * @description Period start of the next invoice
             */
            period_start?: string;
            /**
             * Period End
             * Format: date-time
             * @description Period end of the next invoice
             */
            period_end?: string;
            /**
             * Issue At
             * Format: date-time
             * @description When the next invoice will be issued (notification time)
             */
            issue_at?: string;
            /**
             * Due At
             * Format: date-time
             * @description When the next invoice will be due
             */
            due_at?: string;
            /**
             * Subtotal
             * @description Subtotal before discounts
             */
            subtotal?: string;
            /**
             * Discount Total
             * @description Sum of all discounts
             */
            discount_total?: string;
            /**
             * Total Amount
             * @description Total amount payable
             */
            total_amount?: string;
            /** @description Currency of the next invoice */
            currency?: components["schemas"]["CurrencyCode"];
        };
        /**
         * OrganizationConsumerType
         * @enum {string}
         */
        OrganizationConsumerType: "INDIVIDUAL" | "BUSINESS";
        /**
         * OrganizationCurrencyConfigDTO
         * @description DTO for organization currency configuration.
         */
        OrganizationCurrencyConfigDTO: {
            /**
             * @description Settlement/reporting currency. Always SAR for Moyasar settlements.
             * @default SAR
             */
            home_currency: components["schemas"]["CurrencyCode"];
            /**
             * @description Default currency for new invoices and products.
             * @default SAR
             */
            default_currency: components["schemas"]["CurrencyCode"];
            /**
             * Enabled Currencies
             * @description List of currencies enabled for billing. Must include at least one.
             * @default [
             *       "SAR"
             *     ]
             */
            enabled_currencies: components["schemas"]["CurrencyCode"][];
        };
        /** OrganizationInviteCreate */
        OrganizationInviteCreate: {
            /**
             * Email
             * Format: email
             * @description Email address of the user to invite. Must not already be registered.
             */
            email: string;
            /** @description Role to assign to the invited user. */
            role: components["schemas"]["UserRolesEnum"];
            /**
             * Branches
             * @description List of branch IDs where the user will have access.
             */
            branches: string[];
        };
        /** OrganizationInviteResponse */
        OrganizationInviteResponse: {
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Email
             * Format: email
             */
            email?: string;
            /**
             * Organization Id
             * Format: uuid
             */
            organization_id?: string;
            /**
             * Expire At
             * Format: date-time
             */
            expire_at?: string;
            /**
             * Created By
             * Format: uuid
             */
            created_by?: string;
            role?: components["schemas"]["UserRolesEnum"];
            /** Branches */
            branches?: string[];
        };
        /** Pagination */
        Pagination: {
            /** Total Count */
            total_count?: number;
            /** Max Page */
            max_page?: number;
            /** Current Page */
            current_page?: number;
            /** Limit */
            limit?: number;
            /** Has Next Page */
            has_next_page?: boolean;
            /** Has Previous Page */
            has_previous_page?: boolean;
        };
        /** PaymentDto */
        PaymentDto: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment
             */
            id?: string;
            /**
             * Amount
             * @description Payment amount
             */
            amount?: string;
            /** @description Currency code for the payment (e.g., SAR, USD) */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Scheduled On
             * Format: date-time
             * @description Scheduled date and time for the payment
             */
            scheduled_on?: string;
            /**
             * Invoice Payment Number
             * @description Payment number within the invoice
             */
            invoice_payment_number?: number;
            /** @description Type of payment */
            type?: components["schemas"]["PaymentTypeEnum"];
            /** @description Payment method used */
            payment_method?: components["schemas"]["PaymentMethod"];
            /** @description Current status of the payment */
            current_status?: components["schemas"]["PaymentStatusEnum"];
            /**
             * Format: date-time
             * @description Date and time when the payment was completed
             */
            payed_at?: string | null;
            /**
             * Format: date-time
             * @description Date and time when the payment was settled
             */
            settled_at?: string | null;
            /**
             * Format: date-time
             * @description Date and time when the payment was refunded
             */
            refunded_at?: string | null;
            /** @description URL to the payment PDF document */
            pdf_link?: string | null;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the account the payment was made to
             */
            paid_to_account_id?: string | null;
            /**
             * Amount In Smallest Unit
             * @description Payment amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly amount_in_smallest_unit?: number;
        };
        /**
         * PaymentFlow
         * @enum {string}
         */
        PaymentFlow: "ALL" | "AUTO" | "MANUAL";
        /** PaymentLinkDetailed */
        PaymentLinkDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment link
             */
            id?: string;
            /**
             * Name
             * @description Name of the payment link
             */
            name?: string;
            /** @description Description of the payment link */
            description?: string | null;
            /**
             * Amount
             * @description Total payment link amount after discounts
             */
            amount?: string;
            /**
             * Original Amount
             * @description Original payment link amount before discounts
             */
            original_amount?: string;
            /**
             * Item Level Discounted Amount
             * @description Total amount discounted at the item level
             */
            item_level_discounted_amount?: string;
            /** @description Metadata about how coupons were applied to the payment link */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /** @description Currency code for the payment link (e.g., SAR, USD) */
            currency?: components["schemas"]["CurrencyCode"];
            /** @description Amount in home currency (SAR) at creation; for SAR links or when converted from other currencies. */
            home_currency_amount?: string | null;
            /** @description Exchange rate from link currency to home currency (SAR) at creation time */
            exchange_rate_at_creation?: string | null;
            /** @description Maximum number of times this payment link can be used */
            max_number_of_payments?: number | null;
            /**
             * Format: date-time
             * @description UTC datetime after which the payment link is no longer valid
             */
            valid_until?: string | null;
            /** @description Message to display to the payer after successful payment */
            confirmation_message?: string | null;
            /** @description Billing cycle interval if this payment link creates a subscription */
            recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"];
            /** @description Number of intervals per billing cycle for recurring payments */
            recurring_interval_count?: number | null;
            /** @description Free trial duration (in days) for subscriptions created from this link. Only meaningful for recurring (subscription) products. When set, each consumer who subscribes via this link gets a free trial of this length, after which the first real billing period begins. Must be between 1 and 365. */
            trial_period_days?: number | null;
            /** @description Current status of the payment link */
            status?: components["schemas"]["PaymentLinkStatus"];
            /**
             * Organization Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization
             */
            organization_id?: string;
            /**
             * User Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the user who created the payment link
             */
            user_id?: string;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer if linked to a specific consumer
             */
            organization_consumer_id?: string | null;
            /** @description Message to display when the payment link is deactivated */
            deactivate_message?: string | null;
            /**
             * properties
             * @description Custom fields schema for collecting additional information
             * @example {
             *       "properties": {
             *         "child_name": {
             *           "title": "Child Name",
             *           "type": "string"
             *         },
             *         "parent_email": {
             *           "title": "Parent Email",
             *           "type": "string"
             *         }
             *       },
             *       "required": [
             *         "child_name"
             *       ],
             *       "type": "object"
             *     }
             */
            custom_fields?: Record<string, never> | null;
            /** @description URL to redirect the payer to after a successful payment */
            success_redirect_url?: string | null;
            /** @description URL to redirect the payer to after a failed payment */
            failure_redirect_url?: string | null;
            /** @description The key-value metadata dictionary passed during creation. */
            custom_metadata?: {
                [key: string]: components["schemas"]["JsonValue"];
            } | null;
            /** @description Type of contact information required for payment collection */
            contact_information_type?: components["schemas"]["ContactInformationType"];
            /**
             * Items
             * @description List of products included in the payment link
             */
            items?: components["schemas"]["PaymentLinkItemDto"][];
            /**
             * Coupons
             * @description List of coupons applied to the payment link
             */
            coupons?: components["schemas"]["CouponDto"][];
            /** @description Payment methods override for this payment link */
            override_payment_methods?: components["schemas"]["PaymentMethodDto"];
            /**
             * Url
             * @description Public URL of the payment link for sharing with payers
             */
            url?: string;
            /**
             * Amount Collected
             * @description Total amount collected from payments
             */
            amount_collected?: string;
            /**
             * Amount In Smallest Unit
             * @description Payment link amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly amount_in_smallest_unit?: number;
            /**
             * Original Amount In Smallest Unit
             * @description Original payment link amount (before discounts) in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
            /**
             * Amount Collected In Smallest Unit
             * @description Total amount collected in smallest currency unit.
             */
            readonly amount_collected_in_smallest_unit?: number;
        };
        /** PaymentLinkItemDto */
        PaymentLinkItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the payment link item
             */
            id?: string;
            /**
             * Product Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the product
             */
            product_id?: string;
            /**
             * Quantity
             * @description Quantity of the product in this payment link item
             */
            quantity?: number;
            /**
             * Original Amount
             * @description Original amount before discounts
             */
            original_amount?: string;
            /**
             * Discounted Amount
             * @description Amount after discounts are applied
             */
            discounted_amount?: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /** @description Product details for this payment link item */
            product?: components["schemas"]["ProductDto"];
            /**
             * Allow Custom Quantity
             * @description Whether customers can select custom quantity for this item
             * @default false
             */
            allow_custom_quantity: boolean;
            /** @description Minimum quantity allowed if allow_custom_quantity is True */
            min_quantity?: number | null;
            /** @description Maximum quantity allowed if allow_custom_quantity is True */
            max_quantity?: number | null;
            /** @description Currency code for this item (e.g., SAR, USD) */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Format: uuid4
             * @description Reference to the ProductPrice used for this item, if any
             */
            product_price_id?: string | null;
            /**
             * Original Amount In Smallest Unit
             * @description Original item amount in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
            /**
             * Discounted Amount In Smallest Unit
             * @description Discounted item amount in smallest currency unit.
             */
            readonly discounted_amount_in_smallest_unit?: number;
        };
        /**
         * PaymentLinkStatus
         * @enum {string}
         */
        PaymentLinkStatus: "INACTIVE" | "ACTIVE" | "COMPLETED";
        /** PaymentMarkPaidRequest */
        PaymentMarkPaidRequest: {
            /** @description Manual payment method used. Automated payment methods (e.g., MADA, VISA, MASTERCARD) are not allowed. */
            payment_method: components["schemas"]["PaymentMethod"];
            /** @description Optional note or reference number for the payment (e.g., transaction ID, receipt number) */
            note?: string | null;
        };
        /** PaymentMarkPaidResponse */
        PaymentMarkPaidResponse: Record<string, never>;
        /**
         * PaymentMethod
         * @enum {string}
         */
        PaymentMethod: "MADA" | "MASTERCARD" | "VISA" | "APPLE_PAY" | "SAMSUNG_PAY" | "AMEX" | "CASH" | "PGW_CARD_UNSPECIFIED" | "BANK_TRANSFER" | "CARD" | "QURRAH";
        /** PaymentMethodDto */
        PaymentMethodDto: {
            /**
             * Visa
             * @description visa is enabled
             * @default false
             */
            visa: boolean;
            /**
             * Mastercard
             * @description mastercard is enabled
             * @default false
             */
            mastercard: boolean;
            /**
             * Amex
             * @description amex is enabled
             * @default false
             */
            amex: boolean;
            /**
             * Bank Transfer
             * @description bank_transfer is enabled
             * @default false
             */
            bank_transfer: boolean;
            /**
             * Installment
             * @description installment is enabled
             * @default false
             */
            installment: boolean;
        };
        /**
         * PaymentMethodEnum
         * @enum {string}
         */
        PaymentMethodEnum: "OPENBANKING" | "PAYMENTGATEWAY";
        /**
         * PaymentRefundReason
         * @enum {string}
         */
        PaymentRefundReason: "REQUESTED_BY_CUSTOMER" | "DUPLICATE" | "FRAUDULENT" | "OTHER";
        /** PaymentRefundRequest */
        PaymentRefundRequest: {
            /** @description Reason for the refund */
            refund_reason: components["schemas"]["PaymentRefundReason"];
            /** @description Optional note explaining the refund reason */
            refund_note?: string | null;
            /**
             * Allow Refund Multiple Related Payments
             * @description If true and the customer paid multiple payments at the same time (single transaction), refund all related payments instead of returning an error. Use this when attempting to refund a single payment that was part of a multi-payment transaction.
             * @default false
             */
            allow_refund_multiple_related_payments: boolean;
        };
        /** PaymentResponse */
        PaymentResponse: {
            /**
             * Id
             * Format: uuid
             * @description Unique identifier (UUID) of the payment
             */
            id?: string;
            /**
             * Amount
             * @description Payment amount
             */
            amount?: string;
            /**
             * @description Currency code for the payment (e.g., SAR, USD)
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /**
             * Scheduled On
             * @description Scheduled date and time for the payment
             */
            scheduled_on?: string;
            /** @description Type of payment */
            type?: components["schemas"]["PaymentTypeEnum"];
            /** @description Payment method used */
            payment_method?: components["schemas"]["PaymentMethod"];
            /** @description Current status of the payment */
            current_status?: components["schemas"]["PaymentStatusEnum"];
            /**
             * Format: date-time
             * @description Date and time when the payment was completed
             */
            payed_at?: string | null;
            /**
             * Format: date-time
             * @description Date and time when the payment was refunded
             */
            refunded_at?: string | null;
            /** @description Reason for the refund if applicable */
            refund_reason?: components["schemas"]["PaymentRefundReason"];
            /** @description Note explaining the refund reason if applicable */
            refund_note?: string | null;
            /** @description Latest payment gateway message for this payment */
            latest_pgw_message?: string | null;
            /**
             * Amount In Smallest Unit
             * @description Payment amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly amount_in_smallest_unit?: number;
        };
        /**
         * PaymentStatusEnum
         * @enum {string}
         */
        PaymentStatusEnum: "PENDING" | "PROCESSING" | "FAILED_INITIATION" | "SUCCEEDED" | "FAILED" | "CANCELED" | "UNDER_REVIEW" | "EXPIRED" | "SETTLED" | "REFUNDED";
        /**
         * PaymentTypeEnum
         * @enum {string}
         */
        PaymentTypeEnum: "INITIAL" | "INSTALLMENT" | "SPLIT_PREPAID";
        /**
         * PendingPlanChange
         * @description Server-computed snapshot of a deferred plan change for client display.
         */
        PendingPlanChange: {
            /**
             * Id
             * Format: uuid4
             * @description Pending change identifier
             */
            id?: string;
            /**
             * Effective At
             * Format: date-time
             * @description When this change will take effect (subscription period end)
             */
            effective_at?: string;
            /**
             * Invoice Was Reissued
             * @description True if the next-cycle invoice had to be cancelled and recreated to reflect this change
             */
            invoice_was_reissued?: boolean;
            /**
             * Target Items
             * @description Items the subscription will have after the change is applied
             */
            target_items?: components["schemas"]["PendingPlanChangeItemPreview"][];
            /**
             * Target Subscription Coupon Ids
             * @description Subscription-level coupons that will be active after the change
             */
            target_subscription_coupon_ids?: string[];
            /** @description Billing interval after the change */
            target_recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"];
            /**
             * Target Recurring Interval Count
             * @description Billing interval multiplier after the change
             */
            target_recurring_interval_count?: number;
            /**
             * Target Amount
             * @description Total amount per cycle under the new plan
             */
            target_amount?: string;
            /** @description Currency of all monetary fields here */
            currency?: components["schemas"]["CurrencyCode"];
            /**
             * Current Amount
             * @description Subscription's current per-cycle amount
             */
            current_amount?: string;
            /**
             * Delta Amount
             * @description target_amount - current_amount
             */
            delta_amount?: string;
            /** @description target_amount - current_amount, normalised to a monthly rate. Useful for displaying interval flips in like-for-like terms. */
            delta_amount_per_month?: string | null;
            /**
             * Changes
             * @description Human-renderable, server-computed list of changes
             */
            changes?: components["schemas"]["PendingPlanChangeDiffEntry"][];
            /** @description Fully precomputed next invoice that will be billed under the new plan */
            next_invoice_preview?: components["schemas"]["NextInvoicePreview"];
        };
        /**
         * PendingPlanChangeDiffEntry
         * @description A single human-renderable diff row, computed server-side.
         */
        PendingPlanChangeDiffEntry: {
            /** @description Classification of this diff entry */
            kind?: components["schemas"]["PendingPlanChangeDiffKind"];
            /**
             * Label
             * @description Pre-formatted, locale-neutral label suitable for display
             */
            label?: string;
            /**
             * Format: uuid4
             * @description Affected product, if applicable
             */
            product_id?: string | null;
            /** @description Pre-change value, if applicable */
            from_value?: string | null;
            /** @description Post-change value, if applicable */
            to_value?: string | null;
        };
        /**
         * PendingPlanChangeDiffKind
         * @description Server-classified diff entry kinds for a pending plan change.
         * @enum {string}
         */
        PendingPlanChangeDiffKind: "PRODUCT_ADDED" | "PRODUCT_REMOVED" | "PRODUCT_REPLACED" | "QUANTITY_DECREASED" | "QUANTITY_INCREASED" | "COUPON_ADDED" | "COUPON_REMOVED" | "INTERVAL_CHANGED";
        /** PendingPlanChangeItemPreview */
        PendingPlanChangeItemPreview: {
            /**
             * Product Id
             * Format: uuid4
             * @description Product UUID
             */
            product_id?: string;
            /**
             * Product Name
             * @description Product display name
             */
            product_name?: string;
            /**
             * Quantity
             * @description Quantity that will be billed under the new plan
             */
            quantity?: number;
            /**
             * Original Amount
             * @description Per-item original amount in subscription currency
             */
            original_amount?: string;
            /**
             * Discounted Amount
             * @description Per-item amount after item-level discounts
             */
            discounted_amount?: string;
        };
        /** ProductCreate */
        ProductCreate: {
            /**
             * Name
             * @description Name of the product.
             */
            name: string;
            /** @description Description of the product. */
            description?: string | null;
            /**
             * Price
             * @description [DEPRECATED] Price of the product. Use 'prices' array for multi-currency support.
             */
            price?: number | string | null;
            /** @description Prices for the product in different currencies. At least one price is required. */
            prices?: components["schemas"]["ProductPriceInlineCreate"][] | null;
            /**
             * Is One Time
             * @description Will this product be used only one time in one invoice?
             * @default false
             */
            is_one_time: boolean;
            /** @description the type of product: one off or recurring */
            type: components["schemas"]["ProductType"];
            /** @description Represents the billing cycle interval if product is recurring. Required for cyclic products. For ONE_OFF, value is ignored. */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /**
             * Recurring Interval Count
             * @description The billing cycle multiple if the product is recurring
             * @default 1
             */
            recurring_interval_count: number;
            /** @description [DEPRECATED] Is the price exempt from VAT? Use VAT settings in prices[] instead. */
            is_price_exempt_from_vat?: boolean | null;
            /** @description [DEPRECATED] Is the price inclusive of VAT? Use VAT settings in prices[] instead. */
            is_price_inclusive_of_vat?: boolean | null;
        };
        /**
         * ProductDto
         * @description Product response DTO.
         *
         *     This DTO includes both legacy single-price fields and new multi-currency `prices` array
         *     for backward compatibility with existing API consumers.
         *
         *     Legacy fields (`price`, `currency`, `vat_amount`, etc.) represent the default price
         *     and are kept for backward compatibility. New integrations should use the `prices` array.
         */
        ProductDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the product
             */
            id?: string;
            /**
             * Name
             * @description Name of the product.
             */
            name?: string;
            /** @description Description of the product. */
            description?: string | null;
            /** @description the type of product: one off or recurring */
            type?: components["schemas"]["ProductType"];
            /** @description Represents the billing cycle interval if product is recurring */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /**
             * Recurring Interval Count
             * @description The billing cycle multiple if the product is recurring
             */
            recurring_interval_count?: number;
            /**
             * Price
             * @description Total price including VAT (default currency).
             */
            price?: string;
            /**
             * Currency
             * @description Default price currency of the product.
             * @default SAR
             * @enum {string}
             */
            currency: "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BOV" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BZD" | "CAD" | "CDF" | "CHE" | "CHF" | "CHW" | "CLF" | "CLP" | "CNY" | "COP" | "COU" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MXV" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLE" | "SLL" | "SOS" | "SRD" | "SSP" | "STN" | "SVC" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "USN" | "UYI" | "UYU" | "UYW" | "UZS" | "VED" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XSU" | "XUA" | "YER" | "ZAR" | "ZMW" | "ZWL";
            /**
             * Is Price Exempt From Vat
             * @description Is the default price exempt from VAT?
             */
            is_price_exempt_from_vat?: boolean;
            /**
             * Is Price Inclusive Of Vat
             * @description Is the default price inclusive of VAT?
             */
            is_price_inclusive_of_vat?: boolean;
            /**
             * Price Excluding Vat
             * @description Default price excluding VAT.
             */
            price_excluding_vat?: string;
            /**
             * Vat Amount
             * @description VAT amount for default price.
             */
            vat_amount?: string;
            /**
             * Prices
             * @description All active prices for this product across different currencies.
             */
            prices?: components["schemas"]["ProductPriceInlineDto"][];
            /**
             * Is Active
             * @description Can this product be used in invoices or subscriptions?
             */
            is_active?: boolean;
            /**
             * Is One Time
             * @description Shows if the product was created to be used once, and not to be added to product cataloge
             */
            is_one_time?: boolean;
            /**
             * Is Used In Finalized Invoice
             * @description Is the product used in a finalized invoice?
             * @default false
             */
            is_used_in_finalized_invoice: boolean;
        };
        /**
         * ProductPriceInlineCreate
         * @description Inline price creation for product create/update endpoints.
         */
        ProductPriceInlineCreate: {
            /** @description ISO 4217 currency code */
            currency: components["schemas"]["CurrencyCode"];
            /**
             * Amount
             * @description Price amount (must be >= 1)
             */
            amount: number | string;
            /**
             * Is Price Inclusive Of Vat
             * @description If True, amount includes VAT
             * @default true
             */
            is_price_inclusive_of_vat: boolean;
            /**
             * Is Price Exempt From Vat
             * @description If True, no VAT applies to this price
             * @default false
             */
            is_price_exempt_from_vat: boolean;
        };
        /**
         * ProductPriceInlineDto
         * @description Inline price DTO for product responses.
         */
        ProductPriceInlineDto: {
            /**
             * Id
             * Format: uuid4
             */
            id?: string;
            currency?: components["schemas"]["CurrencyCode"];
            /** Amount */
            amount?: string;
            /** Is Active */
            is_active?: boolean;
            /** Is Price Inclusive Of Vat */
            is_price_inclusive_of_vat?: boolean;
            /** Is Price Exempt From Vat */
            is_price_exempt_from_vat?: boolean;
            /** Price Excluding Vat */
            price_excluding_vat?: string;
            /** Vat Amount */
            vat_amount?: string;
        };
        /**
         * ProductType
         * @enum {string}
         */
        ProductType: "RECURRING" | "ONE_OFF";
        /** ProductUpdate */
        ProductUpdate: {
            /** @description Name of the product. */
            name?: string | null;
            /** @description Description of the product. */
            description?: string | null;
            /**
             * Price
             * @description [DEPRECATED] Price of the product. Use 'prices' array for multi-currency support.
             */
            price?: number | string | null;
            /** @description Prices for the product in different currencies. */
            prices?: components["schemas"]["ProductPriceInlineCreate"][] | null;
            /** @description Whether the product is active. If `true`, the product won't be available for purchase anymore. Existing customers will still have access to the product details in the invoice, and subscriptions will continue normally. */
            is_active?: boolean | null;
            /** @description the type of product: one off or recurring */
            type?: components["schemas"]["ProductType"];
            /** @description Represents the billing cycle interval if product is recurring. Required for cyclic products */
            recurring_interval?: components["schemas"]["RecurringInterval"];
            /** @description The billing cycle multiple if the product is recurring */
            recurring_interval_count?: number | null;
            /** @description [DEPRECATED] Is the price exempt from VAT? Use VAT settings in prices[] instead. */
            is_price_exempt_from_vat?: boolean | null;
            /** @description [DEPRECATED] Is the price inclusive of VAT? Use VAT settings in prices[] instead. */
            is_price_inclusive_of_vat?: boolean | null;
        };
        /**
         * RecurrencePattern
         * @enum {string}
         */
        RecurrencePattern: "Hour" | "Day" | "Week" | "Fortnight" | "Month" | "Quarter" | "Half-Year" | "Year";
        /**
         * RecurringInterval
         * @enum {string}
         */
        RecurringInterval: "WEEK" | "MONTH" | "SEMESTER" | "YEAR";
        /** StreamError */
        StreamError: {
            code?: components["schemas"]["StreamErrorCodes"];
            /** Message */
            message?: string;
            additional_info?: string | null;
        };
        /**
         * StreamErrorCodes
         * @enum {string}
         */
        StreamErrorCodes: "STREAM_ERROR" | "STREAM_UNKNOWN_ERROR" | "PHONE_ALREADY_REGISTERED" | "MFA_VERIFICATION_SESSION_IN_PROGRESS" | "MFA_ATTEMPTS_EXHAUSTED" | "MFA_INVALID" | "MFA_SESSION_EXPIRED" | "MFA_CHANNEL_COOLDOWN" | "RECAPTCHA_INVALID" | "SAUDI_ID_ALREADY_REGISTERED" | "USER_INFO_NOT_VERIFIED" | "COMPANY_NOT_FOUND" | "ORGANIZATION_ALREADY_CREATED" | "USER_NOT_REGISTERED" | "INVALID_PARAMETERS" | "INVITATION_EXPIRED" | "USER_ALREADY_REGISTERED" | "PAYMENT_FLOW_NOT_ALLOWED" | "INVOICE_PAYMENT_COUNT_NOT_MATCHED" | "INVOICE_FINALISED" | "INVOICE_INVALID_STATUS" | "INVOICE_TOTAL_MISMATCH_PAYMENT_AMOUNT_SUM" | "INVOICE_CONSENT_CONSUMED" | "INVOICE_CONSENT_EXPIRED" | "PAYMENT_IN_PROGRESS" | "PAYMENT_FINALIZED" | "PAYMEND_UNPAID" | "PAYMENT_REFUNDED_ALREADY" | "PAYMENT_REFUNDED_FAILED" | "INVALID_STATUS" | "ACCOUNT_ONE_DEFAULT_REQUIRED" | "DUPLICATE_CONSUMER" | "DUPLICATE_PAYMENT" | "DUPLICATE_CARD_TOKEN" | "CONSUMER_HAS_ONGOING_INVOICES" | "CONSUMER_HAS_ONGOING_SUBSCRIPTIONS" | "CONSUMER_HAS_ACTIVE_PAYMENT_LINKS" | "MOYASAR_BAD_REQUEST" | "NOTIFICATION_TEMPLATE_DOES_NOT_EXIST" | "FEATURE_DISABLED" | "INSUFFICIENT_FUNDS" | "PAYMENT_GATEWAY_DECLINED" | "MANUAL_INVOICE_CARD_ID" | "ONE_OFF_INVALID_PAYMENT_FLOW" | "ONE_OFF_CARD_ID" | "AUTO_INVOICE_MISSING_CARD_ID" | "MOYASAR_INVALID_CARD_TOKEN" | "MOYASAR_UNAUTHORIZED" | "MOYASAR_FORBIDDEN" | "MOYASAR_NOT_FOUND" | "MOYASAR_METHOD_NOT_ALLOWED" | "MOYASAR_TOO_MANY_REQUESTS" | "MOYASAR_INTERNAL_SERVER_ERROR" | "MOYASAR_SERVICE_UNAVAILABLE" | "MOYASAR_PAYMENT_INFO_MISMATCH" | "MOYASAR_TIMEOUT" | "PDF_LINK_EXISTS" | "BRANCH_NOT_FOUND" | "BRANCH_ACCESS_DENIED" | "PERMISSION_FORBIDDEN" | "PRODUCT_USED_IN_FINALIZED_INVOICE" | "RESOURCE_ALREADY_EXISTS" | "COUPON_USED_IN_FINALIZED_INVOICE";
        /** SubscriptionCancel */
        SubscriptionCancel: {
            /**
             * Cancel Related Invoices
             * @description Whether or not to cancel all the related invoices to this subscription. If False, only the subscription will be canceled but the related invoices will remain untouched.
             * @default false
             */
            cancel_related_invoices: boolean;
        };
        /** SubscriptionCreate */
        SubscriptionCreate: {
            /**
             * Notify Consumer
             * @description Whether to send a notification to the consumer about the subscription's first invoice
             * @default true
             */
            notify_consumer: boolean;
            /** @description Subscription description or notes */
            description?: string | null;
            /**
             * Items
             * @description List of products or services to include in the subscription
             */
            items: components["schemas"]["SubscriptionItemCreateDto"][];
            /** @description List of coupon UUIDs to apply for discounts on subscription invoices */
            coupons?: string[] | null;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description UUID of the consumer who will subscribe
             */
            organization_consumer_id: string;
            /**
             * Period Start
             * Format: date-time
             * @description Start date of the first billing cycle. For trial subscriptions, this must be a future date — the trial runs from now until this date.
             */
            period_start: string;
            /** @description Number of billing cycles before the subscription automatically cancels. If not specified, the subscription continues indefinitely until manually canceled. */
            until_cycle_number?: number | null;
            /** @description Override payment methods for invoices generated by this subscription. Set any field to null to use the organization's global settings for that payment method. */
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"];
            /**
             * Exclude Coupons If Installments
             * @description If enabled, all coupons (subscription-level and item-level) will be excluded when the payer chooses installments. The payer will need to pay the full amount without discounts when paying by installments.
             * @default false
             */
            exclude_coupons_if_installments: boolean;
            /**
             * @description Currency code (e.g., SAR, USD). Must match coupon currency for fixed-amount coupons.
             * @default SAR
             */
            currency: components["schemas"]["CurrencyCode"];
            /**
             * Trial
             * @description Whether this is a free trial subscription. If true, the trial starts now and billing begins at period_start.
             * @default false
             */
            trial: boolean;
        };
        /** SubscriptionDetailed */
        SubscriptionDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription
             */
            id?: string;
            /** @description Description of the subscription */
            description?: string | null;
            /**
             * Amount
             * @description Total subscription amount after discounts
             */
            amount?: string;
            /**
             * Original Amount
             * @description Original subscription amount before discounts
             */
            original_amount?: string;
            /**
             * Item Level Discounted Amount
             * @description Total amount discounted at the item level
             */
            item_level_discounted_amount?: string;
            /** @description Metadata about how coupons were applied to the subscription */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /**
             * Remaining Days
             * @description Number of days remaining in the current billing period
             */
            remaining_days?: number;
            /** @description Currency code for the subscription (e.g., SAR, USD) */
            currency?: components["schemas"]["CurrencyCode"];
            /** @description Amount in home currency (SAR) at creation */
            home_currency_amount?: string | null;
            /** @description Exchange rate used at subscription creation */
            exchange_rate_at_creation?: string | null;
            /** @description Billing cycle interval */
            recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"];
            /**
             * Recurring Interval Count
             * @description Number of intervals per billing cycle (e.g., 2 for bi-monthly)
             */
            recurring_interval_count?: number;
            /** @description Current status of the subscription */
            status?: components["schemas"]["SubscriptionStatus"];
            /**
             * Current Period Start
             * Format: date-time
             * @description Start date and time of the current billing period
             */
            current_period_start?: string;
            /**
             * Current Period End
             * Format: date-time
             * @description End date and time of the current billing period
             */
            current_period_end?: string;
            /**
             * Current Cycle Number
             * @description Current cycle number of the subscription
             */
            current_cycle_number?: number;
            /**
             * Cancel At Period End
             * @description Whether the subscription will be canceled at the end of the current period
             */
            cancel_at_period_end?: boolean;
            /** @description Cycle number at which the subscription will be automatically canceled */
            cancel_at_cycle_number?: number | null;
            /**
             * Format: date-time
             * @description Date and time when the subscription started
             */
            started_at?: string | null;
            /**
             * Format: date-time
             * @description Date and time when the subscription ended
             */
            ended_at?: string | null;
            /**
             * User Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the user who created the subscription
             */
            user_id?: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            organization_consumer_id?: string;
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the most recent invoice for this subscription
             */
            latest_invoice_id?: string | null;
            /** @description Number of days for the free trial period */
            trial_period_days?: number | null;
            /**
             * Format: date-time
             * @description Date and time when the trial period ends
             */
            trial_end?: string | null;
            /** @description Consumer information for this subscription */
            organization_consumer?: components["schemas"]["app__subscription__v2__dtos__OrganizationConsumer"];
            /** @description List of items included in the subscription */
            items?: components["schemas"]["SubscriptionItemDto"][] | null;
            /** @description Most recent invoice generated for this subscription */
            latest_invoice?: components["schemas"]["InvoiceBase"];
            /** @description Most recent freeze period applied to this subscription */
            latest_freeze?: components["schemas"]["FreezeSubscriptionBase"];
            /** @description Payment methods override for this subscription */
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"];
            /** @description A scheduled deferred change that will be applied at current_period_end, if any */
            pending_change?: components["schemas"]["PendingPlanChange"];
            /**
             * Amount In Smallest Unit
             * @description Subscription amount in smallest currency unit (e.g. halala for SAR).
             */
            readonly amount_in_smallest_unit?: number;
            /**
             * Original Amount In Smallest Unit
             * @description Original subscription amount (before discounts) in smallest currency unit.
             */
            readonly original_amount_in_smallest_unit?: number;
        };
        /** SubscriptionItemCreateDto */
        SubscriptionItemCreateDto: {
            /**
             * Product Id
             * Format: uuid4
             * @description UUID of the product to include
             */
            product_id: string;
            /**
             * Quantity
             * @description Quantity of the product
             */
            quantity: number;
            /** @description List of coupon UUIDs to apply for discounts on this specific item */
            coupons?: string[] | null;
        };
        /** SubscriptionItemDto */
        SubscriptionItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last modification timestamp of the object.
             */
            updated_at?: string | null;
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription item
             */
            id?: string;
            /**
             * Product Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the product
             */
            product_id?: string;
            /**
             * Subscription Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the subscription
             */
            subscription_id?: string;
            /**
             * Quantity
             * @description Quantity of the product in this subscription item
             */
            quantity?: number;
            /**
             * Original Amount
             * @description Original amount before discounts
             */
            original_amount?: string;
            /**
             * Discounted Amount
             * @description Amount after discounts are applied
             */
            discounted_amount?: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"];
            /** @description Product details for this subscription item */
            product?: components["schemas"]["ProductDto"];
        };
        /** SubscriptionPaymentMethodDto */
        SubscriptionPaymentMethodDto: {
            /** @description override visa from global settings */
            visa?: boolean | null;
            /** @description override mastercard from global settings */
            mastercard?: boolean | null;
            /** @description override amex from global settings */
            amex?: boolean | null;
            /** @description override bank_transfer from global settings */
            bank_transfer?: boolean | null;
            /** @description override installment from global settings */
            installment?: boolean | null;
            /** @description override qurrah from global settings */
            qurrah?: boolean | null;
            /** @description Override organization's subscription auto renewal setting. If True, subscription will auto-renew at the end of each period. If False, subscription will be canceled at the end of the current period. If None (default), uses organization's subscription_auto_renewal setting. */
            subscription_auto_renewal?: boolean | null;
        };
        /**
         * SubscriptionRecurringInterval
         * @enum {string}
         */
        SubscriptionRecurringInterval: "WEEK" | "MONTH" | "QUARTER" | "YEAR";
        /**
         * SubscriptionStatus
         * @enum {string}
         */
        SubscriptionStatus: "INACTIVE" | "ACTIVE" | "EXPIRED" | "CANCELED" | "FROZEN" | "TRIALING" | "TRIAL_PENDING";
        /** SubscriptionUpdate */
        SubscriptionUpdate: {
            /** @description Description of the subscription. */
            description?: string | null;
            /**
             * Items
             * @description products to purchaseIf you want to keep existing items, include them in the list.
             */
            items: components["schemas"]["SubscriptionItemCreateDto"][];
            /**
             * Coupons
             * @description coupons to apply to the subscription for discounts.If you want to keep existing coupons, include them in the list.
             */
            coupons: string[];
            /** @description Number of billing cycles the subscription should run before it auto-cancels. If set to the current cycle, cancellation is scheduled at period end. If set to null, subscription will continue indefinitely until manually canceled. */
            until_cycle_number?: number | null;
            /** @description overriden payment methods for generated invoices for the payer - sending 'null' for any value means we should follow organization global settings for that method */
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"];
            /** @description Optional new billing interval. If omitted, the current interval is preserved. Use this to flip monthly <-> yearly without re-checkout. Interval changes always take effect at the next cycle (deferred). */
            recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"];
            /** @description Optional new interval multiplier. Defaults to the current value if omitted. Same deferral behavior as ``recurring_interval``. */
            recurring_interval_count?: number | null;
            /** @description Optional override for the same field on the subscription. */
            exclude_coupons_if_installments?: boolean | null;
        };
        /** UpdateBranchRequest */
        UpdateBranchRequest: {
            /**
             * Name
             * @description New name for the branch. Must be unique within the organization.
             */
            name: string;
        };
        /** UpdatePaymentLinkCouponItemDto */
        UpdatePaymentLinkCouponItemDto: {
            /**
             * Payment Link Item Id
             * Format: uuid4
             * @description Id of an existing payment link item
             */
            payment_link_item_id: string;
            /**
             * Coupons
             * @description Item-level coupons for this item (replaces existing). Omit or [] clears item-level coupons on this item.
             */
            coupons?: string[];
        };
        /** UpdatePaymentLinkCouponsDto */
        UpdatePaymentLinkCouponsDto: {
            /**
             * Coupons
             * @description Link-level coupons (replaces existing). Omit or [] clears link-level coupons.
             */
            coupons?: string[];
            /**
             * Items
             * @description Item-level coupons per item listed; omitted items assume no coupons.
             */
            items?: components["schemas"]["UpdatePaymentLinkCouponItemDto"][];
        };
        /** UpdatePaymentLinkStatusDto */
        UpdatePaymentLinkStatusDto: {
            /** @description New status for the payment link */
            status: components["schemas"]["PaymentLinkStatus"];
            /** @description Optional message to display when the payment link is deactivated */
            deactivate_message?: string | null;
        };
        /**
         * UserRolesEnum
         * @enum {string}
         */
        UserRolesEnum: "organization_admin" | "branch_admin" | "branch_user";
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc?: (string | number)[];
            /** Message */
            msg?: string;
            /** Error Type */
            type?: string;
            /** Input */
            input?: unknown;
            /** Context */
            ctx?: Record<string, never>;
        };
        /** Consumer */
        app__common__dtos__shared__Consumer: {
            /**
             * Id
             * Format: uuid4
             */
            id?: string;
            /** Format: phone */
            phone_number?: string | null;
            /** Format: email */
            email?: string | null;
            preferred_language?: components["schemas"]["Language"];
        };
        /** OrganizationConsumer */
        app__common__dtos__shared__OrganizationConsumer: {
            /**
             * Id
             * Format: uuid4
             */
            id?: string;
            /** Name */
            name?: string;
            alias?: string | null;
            /** Format: email */
            email?: string | null;
            /** Format: phone */
            phone_number?: string | null;
            preferred_language?: components["schemas"]["Language"];
            /** @default INDIVIDUAL */
            consumer_type: components["schemas"]["OrganizationConsumerType"];
            address?: components["schemas"]["AddressResponse"];
            vat_number?: string | null;
            commercial_registration?: string | null;
            consumer?: components["schemas"]["app__common__dtos__shared__Consumer"];
            is_deleted?: boolean | null;
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
        };
        /** Consumer */
        app__consumer__v2__dtos__Consumer: {
            /**
             * Format: uuid4
             * @description Unique identifier (UUID) of the consumer
             */
            id?: string | null;
            /**
             * Format: phone
             * @description Phone number of the consumer
             */
            phone_number?: string | null;
            /** @description Preferred language of the consumer */
            preferred_language?: components["schemas"]["Language"];
        };
        /** OrganizationConsumer */
        app__subscription__v2__dtos__OrganizationConsumer: {
            /**
             * Id
             * Format: uuid4
             * @description Unique identifier (UUID) of the organization consumer
             */
            id?: string;
            /**
             * Name
             * @description Name of the consumer
             */
            name?: string;
            /** @description Alias of the consumer */
            alias?: string | null;
            /** @description Email address of the consumer */
            email?: string | null;
            /** @description Phone number of the consumer */
            phone_number?: string | null;
            /** @description Preferred language of the consumer */
            preferred_language?: components["schemas"]["Language"];
            /**
             * @description Consumer type (individual or business)
             * @default INDIVIDUAL
             */
            consumer_type: components["schemas"]["OrganizationConsumerType"];
            /** @description Business address for business consumers */
            address?: components["schemas"]["AddressResponse"];
            /** @description VAT number for business consumers */
            vat_number?: string | null;
            /** @description Commercial registration for business consumers */
            commercial_registration?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

type ConsumerCreate = components["schemas"]["ConsumerCreate"];
type ConsumerResponse = components["schemas"]["ConsumerResponse"];
type ConsumerUpdate = components["schemas"]["ConsumerUpdate"];
type ConsumerListResponse = components["schemas"]["ListResource_ConsumerResponse_"];
type ProductCreate = components["schemas"]["ProductCreate"];
type ProductDto = components["schemas"]["ProductDto"];
type ProductPriceInlineCreate = components["schemas"]["ProductPriceInlineCreate"];
type ProductPriceInlineDto = components["schemas"]["ProductPriceInlineDto"];
type ProductUpdate = components["schemas"]["ProductUpdate"];
type ProductListResponse = components["schemas"]["ListResource_ProductDto_"];
type CreatePaymentLinkDto = components["schemas"]["CreatePaymentLinkDto"];
type PaymentLinkDetailed = components["schemas"]["PaymentLinkDetailed"];
type PaymentLinkListResponse = components["schemas"]["ListResource_PaymentLinkDetailed_"];
type CouponCreate = components["schemas"]["CouponCreate"];
type CouponDetailed = components["schemas"]["CouponDetailed"];
type CouponUpdate = components["schemas"]["CouponUpdate"];
type CouponListResponse = components["schemas"]["ListResource_CouponDetailed_"];
type MeResponse = components["schemas"]["MeResponse"];
type OrganizationInviteCreate = components["schemas"]["OrganizationInviteCreate"];
type OrganizationInviteResponse = components["schemas"]["OrganizationInviteResponse"];
type BranchItem = components["schemas"]["BranchItem"];
type BranchListResponse = components["schemas"]["BranchListResponse"];
type CreateBranchRequest = components["schemas"]["CreateBranchRequest"];
type UpdateBranchRequest = components["schemas"]["UpdateBranchRequest"];
type InvoiceCreate = components["schemas"]["InvoiceCreate"];
type InvoiceDetailed = components["schemas"]["InvoiceDetailed"];
type InvoiceInPlaceUpdate = components["schemas"]["InvoiceInPlaceUpdate"];
type InvoiceListItem = components["schemas"]["InvoiceListItem"];
type InvoiceListResponse = components["schemas"]["ListResource_InvoiceListItem_"];
type UpdatePaymentLinkCouponItemDto = components["schemas"]["UpdatePaymentLinkCouponItemDto"];
type UpdatePaymentLinkCouponsDto = components["schemas"]["UpdatePaymentLinkCouponsDto"];
type UpdatePaymentLinkStatusDto = components["schemas"]["UpdatePaymentLinkStatusDto"];
type AutoChargeOnDemandResponse = components["schemas"]["AutoChargeOnDemandResponse"];
type PaymentMarkPaidRequest = components["schemas"]["PaymentMarkPaidRequest"];
type PaymentMarkPaidResponse = components["schemas"]["PaymentMarkPaidResponse"];
type PaymentResponse = components["schemas"]["PaymentResponse"];
type PaymentListResponse = components["schemas"]["ListResource_PaymentResponse_"];
type PaymentRefundRequest = components["schemas"]["PaymentRefundRequest"];
type SubscriptionCreate = components["schemas"]["SubscriptionCreate"];
type SubscriptionDetailed = components["schemas"]["SubscriptionDetailed"];
type SubscriptionUpdate = components["schemas"]["SubscriptionUpdate"];
type SubscriptionListResponse = components["schemas"]["ListResource_SubscriptionDetailed_"];
type SubscriptionCancel = components["schemas"]["SubscriptionCancel"];
type FreezeSubscriptionCreateRequest = components["schemas"]["FreezeSubscriptionCreateRequest"];
type FreezeSubscriptionBase = components["schemas"]["FreezeSubscriptionBase"];
type FreezeSubscriptionUpdateRequest = components["schemas"]["FreezeSubscriptionUpdateRequest"];
type FreezeListResponse = components["schemas"]["ListResource_FreezeSubscriptionBase_"];
type Pagination = components["schemas"]["Pagination"];
type PaginationParams = {
    page?: number;
    size?: number;
    sort?: string;
};
/**
 * Convenience input for "one user + one product" payment link.
 * We convert this into CreatePaymentLinkDto under the hood.
 */
type CreateLinkInput = {
    name: string;
    description?: string | null;
    consumerId?: string | null;
    productId: string;
    quantity?: number;
    validUntil?: Date | string | null;
    maxNumberOfPayments?: number | null;
    successRedirectUrl?: string | null;
    failureRedirectUrl?: string | null;
    coupons?: string[];
    customMetadata?: Record<string, unknown> | null;
    contactInformationType?: "PHONE" | "EMAIL" | null;
};
/**
 * High-level payment link creation with optional inline consumer and product creation
 *
 * Smart Matching:
 * - Consumer: Searches for existing consumer by email or phone before creating new
 * - Products: Searches for existing products by name and price before creating new
 * - To force creation of new resources, use unique identifiers
 * - To use specific existing resources, provide id field
 *
 * Note: The API supports only ONE consumer per payment link, but MULTIPLE products
 */
type SimplePaymentLinkInput = {
    name: string;
    description?: string;
    amount?: number;
    currency?: string;
    consumer?: {
        id?: string;
        email?: string;
        phone?: string;
        name?: string;
        metadata?: Record<string, unknown>;
    };
    product?: {
        id?: string;
        name?: string;
        description?: string;
        price?: number;
        currency?: string;
        metadata?: Record<string, unknown>;
    };
    products?: Array<{
        id?: string;
        name?: string;
        description?: string;
        price?: number;
        currency?: string;
        quantity?: number;
        metadata?: Record<string, unknown>;
    }>;
    quantity?: number;
    validUntil?: Date | string;
    maxNumberOfPayments?: number;
    successRedirectUrl?: string;
    failureRedirectUrl?: string;
    coupons?: string[];
    customMetadata?: Record<string, unknown>;
    contactInformationType?: "PHONE" | "EMAIL";
    options?: {
        /**
         * If true, always creates new consumer/product even if matching ones exist
         * Default: false (reuses existing resources)
         */
        forceCreate?: boolean;
    };
};
/**
 * Response from simplified payment link creation
 */
type SimplePaymentLinkResponse = {
    paymentLink: PaymentLinkDetailed;
    paymentUrl: string;
    productIds: string[];
    productId: string | undefined;
    consumerId: string | undefined;
};

type StreamSDKInitOptions = {
    baseUrl?: string;
    /**
     * If you want to use bearer token instead of apiKey, pass bearerToken.
     * OpenAPI shows endpoints accept either JWTBearer or APIKey.  [oai_citation:4‡stream-app-service.streampay.sa](https://stream-app-service.streampay.sa/openapi.json)
     */
    bearerToken?: string;
    fetchFn?: typeof fetch;
};
declare class StreamSDK {
    static init(apiKey: string, opts?: StreamSDKInitOptions): StreamClient;
}
declare class StreamClient {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Helper to build request options with optional query params
     */
    private buildGetRequest;
    /**
     * Get authenticated user and organization info
     * GET /api/v2/me
     */
    getMe(): Promise<MeResponse>;
    /**
     * Invite a user to join the organization by email
     * POST /api/v2/organization/invite
     */
    createOrganizationInvite(input: OrganizationInviteCreate): Promise<OrganizationInviteResponse>;
    /**
     * List all branches
     * GET /api/v2/branch
     */
    listBranches(params?: PaginationParams): Promise<BranchListResponse>;
    /**
     * Create a new branch
     * POST /api/v2/branch
     */
    createBranch(input: CreateBranchRequest): Promise<BranchItem>;
    /**
     * Get a specific branch by ID
     * GET /api/v2/branch/{branch_id}
     */
    getBranch(branchId: string): Promise<BranchItem>;
    /**
     * Update a branch
     * PUT /api/v2/branch/{branch_id}
     */
    updateBranch(branchId: string, input: UpdateBranchRequest): Promise<BranchItem>;
    /**
     * Delete a branch
     * DELETE /api/v2/branch/{branch_id}
     */
    deleteBranch(branchId: string): Promise<void>;
    /**
     * Create a new consumer
     * POST /api/v2/consumers
     */
    createConsumer(input: ConsumerCreate): Promise<ConsumerResponse>;
    /**
     * @deprecated Use createConsumer instead
     */
    createUser(input: ConsumerCreate): Promise<ConsumerResponse>;
    /**
     * List all consumers with pagination
     * GET /api/v2/consumers
     */
    listConsumers(params?: PaginationParams): Promise<ConsumerListResponse>;
    /**
     * Get a specific consumer by ID
     * GET /api/v2/consumers/{consumer_id}
     */
    getConsumer(consumerId: string): Promise<ConsumerResponse>;
    /**
     * Update a consumer
     * PUT /api/v2/consumers/{org_consumer_id}
     */
    updateConsumer(consumerId: string, input: ConsumerUpdate): Promise<ConsumerResponse>;
    /**
     * Delete a consumer
     * DELETE /api/v2/consumers/{org_consumer_id}
     */
    deleteConsumer(consumerId: string): Promise<void>;
    /**
     * Create a new product
     * POST /api/v2/products
     */
    createProduct(input: ProductCreate): Promise<ProductDto>;
    /**
     * List all products with pagination
     * GET /api/v2/products
     */
    listProducts(params?: PaginationParams): Promise<ProductListResponse>;
    /**
     * Get a specific product by ID
     * GET /api/v2/products/{product_id}
     */
    getProduct(productId: string): Promise<ProductDto>;
    /**
     * Update a product
     * PUT /api/v2/products/{product_id}
     */
    updateProduct(productId: string, input: ProductUpdate): Promise<ProductDto>;
    /**
     * Delete a product
     * DELETE /api/v2/products/{product_id}
     */
    deleteProduct(productId: string): Promise<void>;
    /**
     * Create a new coupon
     * POST /api/v2/coupons
     */
    createCoupon(input: CouponCreate): Promise<CouponDetailed>;
    /**
     * List all coupons with pagination
     * GET /api/v2/coupons
     */
    listCoupons(params?: PaginationParams): Promise<CouponListResponse>;
    /**
     * Get a specific coupon by ID
     * GET /api/v2/coupons/{coupon_id}
     */
    getCoupon(couponId: string): Promise<CouponDetailed>;
    /**
     * Update a coupon
     * PUT /api/v2/coupons/{coupon_id}
     */
    updateCoupon(couponId: string, input: CouponUpdate): Promise<CouponDetailed>;
    /**
     * Delete a coupon
     * DELETE /api/v2/coupons/{coupon_id}
     */
    deleteCoupon(couponId: string): Promise<void>;
    /**
     * Create a new invoice
     * POST /api/v2/invoices
     */
    createInvoice(input: InvoiceCreate): Promise<InvoiceDetailed>;
    /**
     * List all invoices with pagination
     * GET /api/v2/invoices
     */
    listInvoices(params?: PaginationParams): Promise<InvoiceListResponse>;
    /**
     * Get a specific invoice by ID
     * GET /api/v2/invoices/{invoice_id}
     */
    getInvoice(invoiceId: string): Promise<InvoiceDetailed>;
    /**
     * Update invoice items in-place (without regenerating)
     * PATCH /api/v2/invoices/{invoice_id}/inplace
     */
    updateInvoiceInPlace(invoiceId: string, input: InvoiceInPlaceUpdate): Promise<InvoiceDetailed>;
    /**
     * List all payments with optional invoice filter
     * GET /api/v2/payments
     */
    listPayments(params?: {
        invoice_id?: string;
    }): Promise<PaymentListResponse>;
    /**
     * Get a specific payment by ID
     * GET /api/v2/payments/{payment_id}
     */
    getPayment(paymentId: string): Promise<PaymentResponse>;
    /**
     * Trigger auto-charge on demand for a payment
     * POST /api/v2/payments/auto-charge-on-demand/{payment_id}
     */
    autoChargeOnDemand(paymentId: string): Promise<AutoChargeOnDemandResponse>;
    /**
     * Mark a payment as paid manually
     * POST /api/v2/payments/{payment_id}/mark-paid
     */
    markPaymentPaid(paymentId: string, input: PaymentMarkPaidRequest): Promise<PaymentMarkPaidResponse>;
    /**
     * Refund a payment
     * POST /api/v2/payments/{payment_id}/refund
     */
    refundPayment(paymentId: string, input: PaymentRefundRequest): Promise<PaymentResponse>;
    /**
     * Create a new subscription
     * POST /api/v2/subscriptions
     */
    createSubscription(input: SubscriptionCreate): Promise<SubscriptionDetailed>;
    /**
     * List all subscriptions with pagination
     * GET /api/v2/subscriptions
     */
    listSubscriptions(params?: PaginationParams): Promise<SubscriptionListResponse>;
    /**
     * Get a specific subscription by ID
     * GET /api/v2/subscriptions/{subscription_id}
     */
    getSubscription(subscriptionId: string): Promise<SubscriptionDetailed>;
    /**
     * Update a subscription
     * PUT /api/v2/subscriptions/{subscription_id}
     */
    updateSubscription(subscriptionId: string, input: SubscriptionUpdate): Promise<SubscriptionDetailed>;
    /**
     * Cancel a subscription
     * POST /api/v2/subscriptions/{subscription_id}/cancel
     */
    cancelSubscription(subscriptionId: string, input?: SubscriptionCancel): Promise<SubscriptionDetailed>;
    /**
     * Freeze a subscription (pause invoice generation)
     * POST /api/v2/subscriptions/{subscription_id}/freeze
     */
    freezeSubscription(subscriptionId: string, input: FreezeSubscriptionCreateRequest): Promise<FreezeSubscriptionBase>;
    /**
     * List all freeze periods for a subscription
     * GET /api/v2/subscriptions/{subscription_id}/freeze
     */
    listSubscriptionFreezes(subscriptionId: string): Promise<FreezeListResponse>;
    /**
     * Update a subscription freeze period
     * PUT /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
     */
    updateSubscriptionFreeze(subscriptionId: string, freezeId: string, input: FreezeSubscriptionUpdateRequest): Promise<FreezeSubscriptionBase>;
    /**
     * Delete a subscription freeze period
     * DELETE /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
     */
    deleteSubscriptionFreeze(subscriptionId: string, freezeId: string): Promise<void>;
    /**
     * Delete a pending subscription plan change
     * DELETE /api/v2/subscriptions/{subscription_id}/pending-change
     */
    deletePendingSubscriptionChange(subscriptionId: string): Promise<void>;
    /**
     * Un-cancel a subscription
     * PUT /api/v2/subscriptions/{subscription_id}/uncancel
     */
    uncancelSubscription(subscriptionId: string): Promise<void>;
    /**
     * Create a payment link (simplified interface)
     * POST /api/v2/payment_links
     */
    createLink(input: CreateLinkInput): Promise<PaymentLinkDetailed>;
    /**
     * Create a payment link (full interface with raw DTO)
     * POST /api/v2/payment_links
     */
    createPaymentLink(input: CreatePaymentLinkDto): Promise<PaymentLinkDetailed>;
    /**
     * List all payment links with pagination
     * GET /api/v2/payment_links
     */
    listPaymentLinks(params?: PaginationParams): Promise<PaymentLinkListResponse>;
    /**
     * Get a specific payment link by ID
     * GET /api/v2/payment_links/{payment_link_id}
     */
    getPaymentLink(paymentLinkId: string): Promise<PaymentLinkDetailed>;
    /**
     * Update coupons on a payment link
     * PATCH /api/v2/payment_links/{payment_link_id}/coupons
     */
    updatePaymentLinkCoupons(paymentLinkId: string, input: UpdatePaymentLinkCouponsDto): Promise<PaymentLinkDetailed>;
    /**
     * Update status of a payment link (e.g. activate/deactivate)
     * PATCH /api/v2/payment_links/{payment_link_id}/status
     */
    updatePaymentLinkStatus(paymentLinkId: string, input: UpdatePaymentLinkStatusDto): Promise<PaymentLinkDetailed>;
    /**
     * Returns the public checkout URL for a payment link.
     */
    getPaymentUrl(link: PaymentLinkDetailed): string | null;
    /**
     * Simplified one-step payment link creation with smart resource matching.
     *
     * This method handles:
     * 1. Smart consumer matching: Searches for existing consumer by email/phone before creating
     * 2. Smart product matching: Searches for existing products by name and price before creating
     * 3. Creating payment link with the matched or newly created resources
     * 4. Returning payment URL directly
     *
     * Resource Matching:
     * - Consumer: Matched by phone (primary) or email (secondary) - Only ONE consumer per link
     * - Products: Matched by name AND price (both must match) - Supports MULTIPLE products
     * - Use `consumer.id` or `product.id` to skip matching and use specific resource
     * - Use `options.forceCreate: true` to always create new resources
     *
     * @example
     * ```typescript
     * // Single product (reuses existing consumer/product if found)
     * const result = await client.createSimplePaymentLink({
     *   name: "Order #1234",
     *   amount: 99.99,
     *   consumer: {
     *     email: "customer@example.com",
     *     name: "Ahmad Ali"
     *   },
     *   product: {
     *     name: "Premium Subscription",
     *     price: 99.99
     *   },
     *   successRedirectUrl: "https://example.com/success"
     * });
     *
     * // Multiple products
     * const result = await client.createSimplePaymentLink({
     *   name: "Order #5678",
     *   consumer: {
     *     phone: "+966501234567",
     *     name: "Fatima Ahmed"
     *   },
     *   products: [
     *     { name: "Product A", price: 50.00, quantity: 2 },
     *     { name: "Product B", price: 75.00, quantity: 1 }
     *   ],
     *   successRedirectUrl: "https://example.com/success"
     * });
     *
     * // Force creation of new resources
     * const result = await client.createSimplePaymentLink({
     *   name: "Order #1234",
     *   amount: 99.99,
     *   consumer: { email: "customer@example.com", name: "Ahmad Ali" },
     *   product: { name: "Premium Subscription", price: 99.99 },
     *   options: { forceCreate: true }
     * });
     *
     * // Use specific existing resources by ID
     * const result = await client.createSimplePaymentLink({
     *   name: "Order #1234",
     *   consumer: { id: "cons_123" },
     *   products: [
     *     { id: "prod_456", quantity: 1 },
     *     { id: "prod_789", quantity: 2 }
     *   ]
     * });
     * ```
     */
    createSimplePaymentLink(input: SimplePaymentLinkInput): Promise<SimplePaymentLinkResponse>;
}

export { type AutoChargeOnDemandResponse, type BranchItem, type BranchListResponse, type ConsumerCreate, type ConsumerListResponse, type ConsumerResponse, type ConsumerUpdate, type CouponCreate, type CouponDetailed, type CouponListResponse, type CouponUpdate, type CreateBranchRequest, type CreateLinkInput, type CreatePaymentLinkDto, type FreezeListResponse, type FreezeSubscriptionBase, type FreezeSubscriptionCreateRequest, type FreezeSubscriptionUpdateRequest, type InvoiceCreate, type InvoiceDetailed, type InvoiceInPlaceUpdate, type InvoiceListItem, type InvoiceListResponse, type MeResponse, type OrganizationInviteCreate, type OrganizationInviteResponse, type Pagination, type PaginationParams, type PaymentLinkDetailed, type PaymentLinkListResponse, type PaymentListResponse, type PaymentMarkPaidRequest, type PaymentMarkPaidResponse, type PaymentRefundRequest, type PaymentResponse, type ProductCreate, type ProductDto, type ProductListResponse, type ProductPriceInlineCreate, type ProductPriceInlineDto, type ProductUpdate, type SimplePaymentLinkInput, type SimplePaymentLinkResponse, type SubscriptionCancel, type SubscriptionCreate, type SubscriptionDetailed, type SubscriptionListResponse, type SubscriptionUpdate, type UpdateBranchRequest, type UpdatePaymentLinkCouponItemDto, type UpdatePaymentLinkCouponsDto, type UpdatePaymentLinkStatusDto, StreamSDK as default };
