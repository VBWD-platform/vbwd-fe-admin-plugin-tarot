# Tarot Admin Plugin (vbwd-fe-admin)

Tarot tarot reading platform — admin extension for user detail pages.

## Purpose

Adds a "Tarot Sessions" tab to the User Details page in the admin backoffice, showing session history, token usage, and arcana interpretation logs for each user.

---

## Related

| | Repository |
|-|------------|
| 🖥 Backend | [vbwd-plugin-tarot](https://github.com/VBWD-platform/vbwd-plugin-tarot) |
| 👤 Frontend (user) | [vbwd-fe-user-plugin-tarot](https://github.com/VBWD-platform/vbwd-fe-user-plugin-tarot) |

**Core:** [vbwd-fe-admin](https://github.com/VBWD-platform/vbwd-fe-admin) · [vbwd-fe-core](https://github.com/VBWD-platform/vbwd-fe-core)

## Extension Point

Registers a section in the User Details view via `extensionRegistry`:
- Component: `TarotAdminUserDetail.vue`
- Section label: "Tarot Sessions"

## Testing

```bash
cd vbwd-fe-admin
./bin/pre-commit-check.sh --unit
```
