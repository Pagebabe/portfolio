# Security Policy

## Scope

This repository contains public demos and evidence packs. It must not contain production credentials, private deployment links, personal data, confidential company material, or live customer records.

## Reporting

Do not publish sensitive details in a public issue. Use GitHub private vulnerability reporting when available. Otherwise open a public issue that requests a private contact channel without including exploit details, credentials, personal data, or private URLs.

A useful report includes:

- affected demo and path;
- affected commit or live URL;
- observed impact;
- safe reproduction steps using synthetic data;
- whether secrets or personal data may be involved.

## Incident rules

If a credential, personal record, confidential document, or private URL is found:

1. do not copy it into another issue, pull request, screenshot, or chat;
2. treat credentials as compromised and rotate them at the provider;
3. remove public access only through a reviewed incident plan;
4. identify affected branches, Actions, Pages artifacts, caches, and deployments;
5. document type, scope, status, and commit range without reproducing the sensitive value;
6. rewrite Git history only after backup, dependency review, and an explicit recovery plan.

## Public-demo boundaries

- all business and personal data must be synthetic or independently safe for publication;
- service workers, manifests, local storage, and offline caches must remain scoped to their demo path;
- public demos must not call private backends or mutate production systems;
- GitHub Actions permissions must be minimal and explicit;
- Pages deployments must be bound to reviewed commits and evidence;
- screenshots and test artifacts must be checked for secrets and personal data;
- no real email domains, phone numbers, customer names, credentials, or internal URLs may be used as fixtures.

## Supported state

Only the current default branch and explicitly documented live Pages deployments are supported. Historical branches and temporary preview artifacts are not security-maintained unless an issue states otherwise.
