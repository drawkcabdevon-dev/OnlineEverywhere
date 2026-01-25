# Deploying Online Everywhere to Google Cloud Storage (GCS)

This guide helps you move from Google Sites to a premium static site hosted on GCS, using your existing domain.

## Prerequisites
1. A Google Cloud Project.
2. The `gcloud` CLI installed locally (optional, can use Console).
3. Access to your Domain Registrar (e.g., GoDaddy, Namecheap, Google Domains).

## Step 1: Build the Site
Run the following in the `marketing-site` directory:
```bash
npm run build
```
This generates a `dist` folder. This is your "Live" website.

## Step 2: Create a GCS Bucket
1. Go to the [GCS Console](https://console.cloud.google.com/storage/browser).
2. Create a bucket named exactly your domain name (e.g., `www.onlineverywhere.com`).
3. Set **Location type** to Multi-region or Region.
4. **Public Access**: Uncheck "Enforce public access prevention on this bucket".
5. Set **Access Control** to "Uniform".

## Step 3: Configure as a Static Website
1. In the bucket list, click the three dots for your bucket and select **Edit website configuration**.
2. Set **Index (main) page** to `index.html`.
3. Set **Error page** to `index.html` (since we are using React).

## Step 4: Make Files Publicly Readable
1. Go to the **Permissions** tab of the bucket.
2. Click **Grant Access**.
3. Under **New principals**, type `allUsers`.
4. Under **Select a role**, choose **Cloud Storage > Storage Object Viewer**.

> [!WARNING]
> **"Domain Restricted Sharing" Error**: If you see an error saying "IAM policy update failed" due to organization policy:
> 1.  This is a security setting on your Google Cloud Organization.
> 2.  **Solution**: Skip this "Make Files Public" step and jump straight to **Option A (Load Balancer)** below. The Load Balancer can access your bucket privately, so you don't need to make the bucket public to the whole world directly.


## Step 5: Upload Files
1. Upload everything *inside* the `dist` folder to the root of your bucket.

## Step 6: Connect Your Custom Domain
To use HTTPS (which is required for modern sites):
- **Option A (Recommended)**: Use **Google Cloud Load Balancing**. It handles SSL certificates and points to your GCS bucket.
- **Option B**: Use **Cloudflare** as a proxy. It's free and handles SSL easily. Just point Cloudflare's CNAME to `c.storage.googleapis.com`.

### DNS Settings (Squarespace / Google Domains)
Since your domain is hosted on Squarespace (transferred from Google):

1.  **Get your IP**: In Google Cloud Console -> Network Services -> Load Balancing, click on your new Load Balancer and copy the **Frontend IP Address**.
2.  **Go to Squarespace**: Login and find your domain's **DNS Settings**.
3.  **Delete Old Records**: Remove any `CNAME` or `A` records that point to `ghs.googlehosted.com` (this was your old Google Site).
4.  **Add New Record**:
    *   **Type**: `A`
    *   **Host**: `@` (or leave blank for root)
    *   **Data/Value**: Paste your Load Balancer IP Address.
    *   **Host**: `www`
    *   **Data/Value**: Paste the same Load Balancer IP Address.

---
### Troubleshooting: "Invalid IP Address" Error
If Squarespace says the IP address is **invalid**, check these two common issues:

1.  **Is it IPv6?**
    *   Google Load Balancers sometimes give you an IPv6 address (long, contains letters like `2600:1900:...`).
    *   **Fix**: Squarespace `A` records *only* accept **IPv4** (short, numbers like `34.120.x.x`).
    *   **Solution**: In Google Cloud Console, go to your Load Balancer -> **Frontend configuration**. Create a NEW Frontend IP and specifically choose **IPv4**. Use that new number.

2.  **Is it an ephemeral IP?**
    *   Ensure you reserved a **Static IP** address when creating the frontend, not an ephemeral one, although Squarespace usually accepts ephemeral ones, static is better for reliability.
## Testing Locally
Before deploying, you can test the production build locally:
```bash
npm run preview
```
This serves the contents of the `dist` folder so you can verify exactly what will go live.
