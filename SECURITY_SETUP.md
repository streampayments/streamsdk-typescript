# Repository Security Setup Guide

This guide ensures only StreamPay team members can update the stream-sdk repository.

## 🔒 Security Checklist

After pushing the CODEOWNERS file, complete these steps on GitHub:

### 1. Branch Protection Rules

Navigate to: **Settings → Branches → Add branch protection rule**

**Branch name pattern**: `main`

Enable the following rules:

#### Required Reviews
- ✅ **Require a pull request before merging**
  - Required approvals: **1** (or **2** for higher security)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
  - ✅ Require approval of the most recent reviewable push

#### Status Checks
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Add required checks: `typecheck`, `build` (when CI is set up)

#### Additional Restrictions
- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (optional but recommended)
- ✅ **Do not allow bypassing the above settings**
- ✅ **Restrict who can push to matching branches**
  - Add: `@ibtisam-streampay` and `@streampay/sdk-team`
- ✅ **Do not allow force pushes**
- ✅ **Do not allow deletions**

**Save changes**

---

### 2. Repository Access Control

Navigate to: **Settings → Collaborators and teams**

#### Base Permissions
- Set **Base permissions** to: **Read**
  - This ensures anyone outside your organization has read-only access
  - Only explicitly added collaborators can write

#### Add Team (Recommended)
1. Click **Add teams** → Create or select `@streampay/sdk-team`
2. Set permission level: **Maintain** or **Write**
   - **Maintain**: Can push to protected branches (if allowed in branch protection)
   - **Write**: Can push but not override protection rules
3. Add team members to `@streampay/sdk-team`

#### Add Individual Collaborators
1. Click **Add people**
2. Add: `@ibtisam-streampay`
3. Set role: **Admin** or **Maintain**
   - **Admin**: Full control (settings, collaborators, deletion)
   - **Maintain**: Can manage without destructive access

#### Current Recommended Setup
| User/Team | Role | Reason |
|-----------|------|--------|
| `@ibtisam-streampay` | Admin | Lead developer, full control |
| `@streampay/sdk-team` | Maintain | Core team, can review and merge |
| Public | Read | Open source, view only |

---

### 3. Repository Settings

Navigate to: **Settings → General**

#### Pull Requests
- ✅ **Allow merge commits**
- ✅ **Allow squash merging**
- ⬜ **Allow rebase merging** (optional)
- ✅ **Always suggest updating pull request branches**
- ✅ **Automatically delete head branches** (cleanup merged branches)

#### Merge Button
- ⬜ **Allow auto-merge**
  - Keep disabled for manual review

#### Archives
- ⬜ **Make repository private**
  - Keep unchecked (public repository as decided)

---

### 4. GitHub Actions Settings (If Using CI/CD)

Navigate to: **Settings → Actions → General**

#### Workflow Permissions
- ✅ **Read repository contents and packages permissions**
- ⬜ **Read and write permissions** (only if needed for releases)

#### Fork Pull Request Workflows
- ✅ **Require approval for first-time contributors**
  - Prevents malicious code execution from external PRs

---

## 🔐 CODEOWNERS Configuration

Already created in `.github/CODEOWNERS`:

```
# Default owners for everything in the repo
* @ibtisam-streampay @streampay/sdk-team

# Source code requires review from SDK team
/src/** @ibtisam-streampay @streampay/sdk-team

# Package.json changes require admin approval
/package.json @ibtisam-streampay

# Documentation can be reviewed by anyone on the team
/*.md @streampay/sdk-team
/docs/** @streampay/sdk-team

# Build configuration requires careful review
/tsconfig.json @ibtisam-streampay
/tsup.config.ts @ibtisam-streampay

# GitHub workflows require admin approval
/.github/workflows/** @ibtisam-streampay
```

**How it works**:
- When anyone opens a PR, code owners are automatically requested for review
- PR cannot be merged until code owner approves (if "Require review from Code Owners" is enabled)

---

## 🚨 Security Best Practices

### For Repository Admins
1. **Enable 2FA** - Require two-factor authentication for all team members
2. **Review Access Regularly** - Audit collaborators quarterly
3. **Use Protected Branches** - Never commit directly to `main`
4. **Sign Commits** - Enable GPG signing for verification
5. **Scan for Secrets** - Enable GitHub's secret scanning

### For Contributors
1. **Always Create PRs** - Never push directly to `main`
2. **Small, Focused PRs** - Easier to review
3. **Update Branches** - Keep your branch up-to-date with `main`
4. **Respond to Reviews** - Address all comments before merging
5. **Test Locally** - Run `npm run typecheck` and `npm run build` before pushing

---

## 📋 Verification Checklist

After completing the setup, verify:

- [ ] CODEOWNERS file is committed and pushed to GitHub
- [ ] Branch protection rules are enabled on `main` branch
- [ ] Base repository permissions set to "Read"
- [ ] Team `@streampay/sdk-team` created with appropriate members
- [ ] `@ibtisam-streampay` has Admin access
- [ ] Pull requests require at least 1 approval
- [ ] Code owners must review PRs affecting their files
- [ ] Force pushes are disabled on `main`
- [ ] Branch deletion is disabled on `main`
- [ ] Auto-delete head branches is enabled
- [ ] Workflow permissions are restricted (if using Actions)

---

## 🆘 Common Issues

### Issue: "CODEOWNERS not working"
**Solution**:
- Ensure file is at `.github/CODEOWNERS` (exact path)
- Verify usernames start with `@`
- Check team exists: `@streampay/sdk-team`
- Enable "Require review from Code Owners" in branch protection

### Issue: "Can't push to main even as admin"
**Solution**:
- In branch protection, check "Do not allow bypassing the above settings"
- If needed, temporarily add yourself to "Restrict who can push" list
- Best practice: Always use PRs, even for admins

### Issue: "External contributors can't create PRs"
**Solution**:
- This is expected behavior if base permissions are "Read"
- External contributors can fork → create PR from fork
- Enable "Require approval for first-time contributors" in Actions settings

---

## 🔄 Regular Maintenance

### Monthly
- Review open PRs and issues
- Check for outdated dependencies
- Audit collaborator access

### Quarterly
- Review and update CODEOWNERS
- Audit team membership
- Review branch protection rules
- Check for security advisories

### After Major Changes
- Update CODEOWNERS if file structure changes
- Review permissions when team members leave/join
- Update required status checks when CI changes

---

## 📞 Security Contacts

**Security Issues**: security@streampay.sa
**Repository Admin**: ibtisam@streampay.sa
**General Support**: support@streampay.sa

---

## 📚 Additional Resources

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [About Code Owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Managing Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams)
- [Repository Security](https://docs.github.com/en/code-security/getting-started/securing-your-repository)

---

**Setup completed by**: Ibtisam (ibtisam@streampay.sa)
**Last updated**: 2024-12-02
