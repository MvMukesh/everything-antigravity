---
name: database-schema-designer
description: Relational and NoSQL database schema design guidelines, non-destructive migration strategies, and index optimization.
---

# Database Schema Designer Skill Pack

## Overview
Guidelines for architecting robust, performant database layers across PostgreSQL, SQLite, Prisma, and Cloud Firestore.

## Best Practices
1. **Normalization**: Design schemas in 3rd Normal Form (3NF) to eliminate data redundancy, using foreign key constraints and cascade rules.
2. **Indexing**: Add composite indexes on columns frequently queried in `WHERE`, `JOIN`, and `ORDER BY` clauses.
3. **Safe Migrations**: Always write idempotent migration scripts (`CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ADD COLUMN IF NOT EXISTS`). Never drop columns or tables without explicit backup/archive steps.
4. **Repository Layer**: Encapsulate all database calls behind a repository interface (`findAll`, `findById`, `create`, `update`, `delete`).
