import test, { expect, request } from '@playwright/test';
import { testData } from './helpers/testData';
import { title } from 'process';

test.describe('Api test cases for CRUD operation for posts', () => {
  test.describe('POST', async () => {
    test('Successful creation returns 201 Created with the new post object', async ({
      request,
    }) => {
      const createNewPost = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          data: testData.correct,
        }
      );

      await expect(createNewPost.status()).toBe(201);
    });

    test.skip('Missing fields return 400 Bad Request', async ({ request }) => {
      const createNewPostWithMissingFiald = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          data: testData.incorrect,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      console.log('QA!!!', createNewPostWithMissingFiald.status());

      await expect(createNewPostWithMissingFiald.status()).toBe(400);
    });
  });

  test.describe('GET', async () => {
    test('Fetching all posts returns 200 OK with a list of posts', async ({
      request,
    }) => {
      const getListOfPosts = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
      );

      expect(getListOfPosts.status()).toBe(200);
    });

    test('Non-existent post returns 404 Not Found', async ({ request }) => {
      const getListOfPosts = await request.get(
        'https://jsonplaceholder.typicode.com/posts/777'
      );

      expect(getListOfPosts.status()).toBe(404);
    });
  });

  test.describe('PUT', async () => {
    test('Updating a post returns 200 OK with the updated object', async ({
      request,
    }) => {
      const updatedPost = await request.put(
        'https://jsonplaceholder.typicode.com/posts/7',
        { data: { title: 'AQA Automation' } }
      );

      await expect(updatedPost.status()).toBe(200);
    });

    test.skip('Non-existent posts return 404 Not Found', async ({
      request,
    }) => {
      const updatedPost = await request.put(
        'https://jsonplaceholder.typicode.com/posts/101'
        // { data: { title: 'AQA Automation' } }
      );

      await expect(updatedPost.status()).toBe(404);
    });
  });

  test.describe('DELETE', async () => {
    test('Successful deletion returns 200 OK or 204 No Content', async ({
      request,
    }) => {
      const deletePost = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      await expect(deletePost.status()).toBe(200);
    });
  });
});
