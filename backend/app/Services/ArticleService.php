<?php

namespace App\Services;

use http\Exception\RuntimeException;
use Illuminate\Support\Facades\Http;

class ArticleService
{
    public function fetchArticles($source, $category = null, $searchQuery = null)
    {
        // Choose the API based on the selected source
        switch ($source) {
            case 'guardian':
                $url = 'https://content.guardianapis.com/search?api-key=' . config('keys.guardian');
                break;
            case 'nytimes':
                $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' . config('keys.new_york');
                break;
            default:
                $url = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=' . config('keys.news_api');
                break;
        }

        // Apply category filter if provided
        if ($category) {
            if ($source !== 'guardian') {
                $url .= '&category=' . urlencode($category);
            } else {
                $url .= '&section=' . urlencode($category);
            }
        }

        // Apply search query if provided
        if ($searchQuery) {
            $url .= '&q=' . urlencode($searchQuery);
        }

        // Fetch articles from the selected source
        $response = Http::get($url);
        if ($response->failed()) {
            throw new RuntimeException($response->body());
        }
        switch ($source) {
            case 'guardian':
                $data = $response->json()['response']['results'];
                return collect($data)->map(function ($article) {
                    $article = (object)$article;
                    return [
                        'id' => $article->id,
                        'title' => $article->webTitle,
                        'description' => ''
                    ];
                });
            case 'nytimes':
                $data = $response->json()['response']['docs'] ?? [];
                return collect($data)->map(function ($article) {
                    $article = (object)$article;
                    return [
                        'id' => $article->_id,
                        'title' => $article->abstract,
                        'description' => $article->lead_paragraph,
                        'image' => "https://www.nytimes.com/" . $article->multimedia[0]['url'] ?? null,
                    ];
                });
            default:
                $data = $response->json()['articles'] ?? [];
                return collect($data)->map(function ($article) {
                    $article = (object)$article;
                    return [
                        'id' => $article->author,
                        'title' => $article->title,
                        'description' => $article->description ?? $article->content,
                        'image' => $article->urlToImage,
                    ];
                });
        }
    }
}
