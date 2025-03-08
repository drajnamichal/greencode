import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test('GET - Retrieve a specific post', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/posts/1`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('title');
});

test('POST - Create a new post', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/posts`, {
    data: {
      title: 'Test post',
      body: 'Content of the test post',
      userId: 1,
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body.title).toBe('Test post');
});

// Placeholder for PUT API test
// test('PUT - Update an existing post', async ({ request }) => {
//   // Write your PUT API test here
// });

test('DELETE - Delete an existing post', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/posts/1`);
  expect(response.status()).toBe(200);
});

// Placeholder for getting non-existent post API test
// test('GET - Handle non-existent post', async ({ request }) => {
//   // Write your test here
// });

test('GET - Measure API response time', async ({ request }) => {
  const startTime = Date.now();
  const response = await request.get(`${BASE_URL}/posts`);
  expect(response.ok()).toBeTruthy();
  const duration = Date.now() - startTime;
  // console.log(`Response time: ${duration}ms`);
  expect(duration).toBeLessThan(500); // Expect API to respond within 500ms
});

test('GET - Validate email format', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/users`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  body.forEach(user => {
    expect(emailRegex.test(user.email)).toBeTruthy();
  });
});

// API mocking
test('GET - Mock response for specific post',{ tag: '@mocking' }, async ({ page }) => {
  await page.route(`${BASE_URL}/posts/1`, async route => {
    const json = { id: 1, title: 'Mocked Post', body: 'Mocked content', userId: 1 };
    await route.fulfill({ json });
  });
  // fetch request performed from the browser context
  const body = await page.evaluate(async (url) => {
    const response = await fetch(url);
    return response.json();
  }, `${BASE_URL}/posts/1`);
  expect(body.title).toBe('Mocked Post');
  expect(body.body).toBe('Mocked content');
});
