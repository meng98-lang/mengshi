import { pgTable, serial, varchar, timestamp, index, text, boolean, integer, uuid, numeric, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const settings = pgTable("settings", {
	id: serial().primaryKey().notNull(),
	whatsappPhone: varchar("whatsapp_phone", { length: 50 }).default('499876543210').notNull(),
	facebookPixelId: varchar("facebook_pixel_id", { length: 100 }),
	googleAnalyticsId: varchar("google_analytics_id", { length: 100 }),
	tiktokPixelId: varchar("tiktok_pixel_id", { length: 100 }),
	adminPassword: varchar("admin_password", { length: 100 }).default('coolzone2024').notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const inquiries = pgTable("inquiries", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	message: text().notNull(),
	productName: varchar("product_name", { length: 200 }),
	isRead: boolean("is_read").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("inquiries_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("inquiries_is_read_idx").using("btree", table.isRead.asc().nullsLast().op("bool_ops")),
]);

export const traffic = pgTable("traffic", {
	id: serial().primaryKey().notNull(),
	date: varchar({ length: 10 }).notNull(),
	path: varchar({ length: 500 }).notNull(),
	country: varchar({ length: 10 }),
	referrer: text(),
	userAgent: text("user_agent"),
	searchKeyword: varchar("search_keyword", { length: 500 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("traffic_country_idx").using("btree", table.country.asc().nullsLast().op("text_ops")),
	index("traffic_date_idx").using("btree", table.date.asc().nullsLast().op("text_ops")),
	index("traffic_path_idx").using("btree", table.path.asc().nullsLast().op("text_ops")),
]);

export const maxplusSettings = pgTable("maxplus_settings", {
	id: integer().default(1).primaryKey().notNull(),
	siteName: text("site_name").default('MaxPlus'),
	whatsappNumber: text("whatsapp_number").default(''),
	whatsappMessage: text("whatsapp_message").default('Hello, I\'m interested in MaxPlus'),
	adminPassword: text("admin_password").default('maxplus2024'),
	stripeKey: text("stripe_key").default(''),
	squareKey: text("square_key").default(''),
	paypalKey: text("paypal_key").default(''),
	activePayment: text("active_payment").default('whatsapp'),
	currency: text().default('USD'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusProducts = pgTable("maxplus_products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	subtitle: text().default(''),
	description: text().default(''),
	descriptionHtml: text("description_html").default(''),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	comparePrice: numeric("compare_price", { precision: 10, scale:  2 }).default('0'),
	quantity: integer().default(1),
	label: text().default(''),
	badge: text().default(''),
	imageUrl: text("image_url").default(''),
	images: text().array().default([""]),
	highlights: text().array().default([""]),
	specifications: jsonb().default([]),
	rating: numeric({ precision: 2, scale:  1 }).default('4.8'),
	reviews: integer().default(0),
	enabled: boolean().default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusOrders = pgTable("maxplus_orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderNumber: text("order_number").notNull(),
	customerName: text("customer_name").default(''),
	customerEmail: text("customer_email").default(''),
	customerPhone: text("customer_phone").default(''),
	shippingAddress: text("shipping_address").default(''),
	items: jsonb().default([]),
	totalAmount: numeric("total_amount", { precision: 10, scale:  2 }).default('0'),
	currency: text().default('USD'),
	status: text().default('pending'),
	paymentMethod: text("payment_method").default('whatsapp'),
	paymentId: text("payment_id").default(''),
	notes: text().default(''),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusCartEvents = pgTable("maxplus_cart_events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sessionId: text("session_id").notNull(),
	productId: uuid("product_id"),
	quantity: integer().default(1),
	eventType: text("event_type").default('add_to_cart'),
	ip: text().default(''),
	page: text().default(''),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusPixels = pgTable("maxplus_pixels", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: text().notNull(),
	name: text().notNull(),
	pixelId: text("pixel_id").default(''),
	customCode: text("custom_code").default(''),
	enabled: boolean().default(true),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusTraffic = pgTable("maxplus_traffic", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sessionId: text("session_id").notNull(),
	page: text().default(''),
	referrer: text().default(''),
	userAgent: text("user_agent").default(''),
	ip: text().default(''),
	country: text().default(''),
	device: text().default(''),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const maxplusClicks = pgTable("maxplus_clicks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: text().notNull(),
	label: text().default(''),
	ip: text().default(''),
	page: text().default(''),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// ============================================================
// 百年孟氏济善堂参茸商行 (mengshi) tables — prefix ms_
// ============================================================

export const msSettings = pgTable("ms_settings", {
	id: integer().default(1).primaryKey().notNull(),
	site_name: text("site_name").default('百年孟氏济善堂参茸商行'),
	whatsapp_number: text("whatsapp_number").default('8613800000000'),
	whatsapp_message: text("whatsapp_message").default('您好，我对贵店药材有兴趣。'),
	admin_password: text("admin_password").default('mengshi2024'),
	currency: text("currency").default('USD'),
	facebook_pixel_id: text("facebook_pixel_id").default(''),
	google_analytics_id: text("google_analytics_id").default(''),
	tiktok_pixel_id: text("tiktok_pixel_id").default(''),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const msProducts = pgTable("ms_products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	category: varchar("category", { length: 50 }).notNull().default('herb'),
	// 多语言字段，jsonb: { "zh-CN": {...}, "zh-TW": {...}, "en": {...} }
	name_i18n: jsonb("name_i18n").notNull(),
	subtitle_i18n: jsonb("subtitle_i18n"),
	description_i18n: jsonb("description_i18n"),
	origin_i18n: jsonb("origin_i18n"),
	price_usd: numeric("price_usd", { precision: 10, scale: 2 }).notNull(),
	compare_price_usd: numeric("compare_price_usd", { precision: 10, scale: 2 }),
	unit_i18n: jsonb("unit_i18n"),
	images: jsonb("images").default(sql`'[]'::jsonb`),
	highlights_i18n: jsonb("highlights_i18n"),
	rating: numeric("rating", { precision: 2, scale: 1 }).default('4.9'),
	reviews_count: integer("reviews_count").default(0),
	enabled: boolean("enabled").default(true).notNull(),
	sort_order: integer("sort_order").default(0),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("ms_products_category_idx").using("btree", table.category.asc().nullsLast().op("text_ops")),
	index("ms_products_enabled_idx").using("btree", table.enabled.asc().nullsLast().op("bool_ops")),
	index("ms_products_sort_idx").using("btree", table.sort_order.asc().nullsLast().op("int4_ops")),
]);

export const msOrders = pgTable("ms_orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	order_number: varchar("order_number", { length: 50 }).notNull(),
	product_id: uuid("product_id").references(() => msProducts.id, { onDelete: "set null" }),
	product_name: varchar("product_name", { length: 255 }),
	quantity: integer("quantity").default(1).notNull(),
	total_usd: numeric("total_usd", { precision: 10, scale: 2 }).default('0'),
	customer_name: varchar("customer_name", { length: 100 }).notNull(),
	customer_phone: varchar("customer_phone", { length: 50 }).notNull(),
	customer_email: varchar("customer_email", { length: 255 }),
	customer_wechat: varchar("customer_wechat", { length: 100 }),
	contact_method: varchar("contact_method", { length: 20 }).default('whatsapp'),
	country: varchar("country", { length: 100 }),
	address: text("address"),
	message: text("message"),
	locale: varchar("locale", { length: 10 }).default('zh-CN'),
	status: varchar("status", { length: 20 }).default('pending').notNull(),
	is_read: boolean("is_read").default(false).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("ms_orders_product_id_idx").using("btree", table.product_id.asc().nullsLast().op("uuid_ops")),
	index("ms_orders_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
	index("ms_orders_created_idx").using("btree", table.created_at.desc().nullsLast().op("timestamptz_ops")),
]);
