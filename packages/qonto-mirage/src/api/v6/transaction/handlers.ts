import { Response } from "miragejs";
import type { makeServer } from "../../../index";
import camelCase from "lodash.camelcase";

function sortStrings(a, b) {
  return a.localeCompare(b);
}

function sortNumbers(a, b) {
  return a - b;
}

function getSignedAmount(transaction) {
  const coefficient = transaction.side === "credit" ? 1 : -1;
  return transaction.amount * coefficient;
}

function getSortFn(sortProperty, sortDirection) {
  const sortCoefficient = sortDirection === "asc" ? 1 : -1;
  if (sortProperty === "amount") {
    return (a, b) =>
      sortNumbers(getSignedAmount(a), getSignedAmount(b)) * sortCoefficient;
  }
  if (["counterpartyName", "operationMethod"].includes(sortProperty)) {
    return (a, b) =>
      sortStrings(a[sortProperty], b[sortProperty]) * sortCoefficient;
  }
  return (a, b) =>
    sortNumbers(a[sortProperty], b[sortProperty]) * sortCoefficient;
}

export default function register(server: ReturnType<typeof makeServer>) {
  server.post(`/v6/transactions/search`, function (schema, request) {
    let {
      search = "",
      sort: { property = "emitted_at", direction = "desc" },
      pagination: { page = 1, per_page = 25 },
    } = JSON.parse(request.requestBody);

    const formattedSortProperty = camelCase(property);

    const collection = schema
      .all("transaction")
      .filter((transaction) =>
        transaction
          .counterpartyName!.toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort(getSortFn(formattedSortProperty, direction));

    let meta = {
      total_count: collection.length,
    };

    let responseBody = this.serialize(
      collection.slice((page - 1) * per_page, page * per_page)
    );

    return new Response(200, {}, { ...responseBody, meta });
  });
}
