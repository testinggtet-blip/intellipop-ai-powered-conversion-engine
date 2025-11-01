import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const popups = sqliteTable('popups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  template: text('template'),
  headline: text('headline').notNull(),
  subheadline: text('subheadline'),
  buttonText: text('button_text').notNull(),
  backgroundColor: text('background_color').notNull().default('#ffffff'),
  textColor: text('text_color').notNull().default('#000000'),
  buttonColor: text('button_color').notNull().default('#6366f1'),
  borderRadius: integer('border_radius').notNull().default(12),
  showImage: integer('show_image', { mode: 'boolean' }).notNull().default(true),
  showCloseButton: integer('show_close_button', { mode: 'boolean' }).notNull().default(true),
  showOverlay: integer('show_overlay', { mode: 'boolean' }).notNull().default(true),
  closeOnOutsideClick: integer('close_on_outside_click', { mode: 'boolean' }).notNull().default(true),
  animationEnabled: integer('animation_enabled', { mode: 'boolean' }).notNull().default(true),
  animationStyle: text('animation_style').notNull().default('fade'),
  embedCode: text('embed_code'),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});