const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "corsair-us-dev",
  accessToken: "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",
});

//Api search product using graphql
app.get("/products", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const products = await shopify.graphql(`{
      shop {
        products(first: 10, query: "${keyword}") {
          edges {
            node {
              id
              title
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
    `);
    res.send({ products });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

//Api create product and add metafield to sku id
app.post("/product", async (req, res) => {
  const title = req.body.title;

  const product = await shopify.product.create({
    title: title,
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    variants: [
      {
        option1: "First",
        price: "10.00",
        sku: "1",
      },
      {
        option1: "Second",
        price: "20.00",
        sku: "2",
      },
    ],
  });
  res.send({ product });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
