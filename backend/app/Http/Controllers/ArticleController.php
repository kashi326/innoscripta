<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $preference = $user->preference;

        // Get the selected source from the request or use the preferred source if available
        $source = $request->input('source', ($preference ? $preference->preferred_sources : 'https://newsapi.org'));

        // Get the selected category from the request or use the preferred category if available
        $category = $request->input('category', ($preference ? $preference->preferred_categories : 'technology'));

        // Get the search query from the request
        $searchQuery = $request->input('search');

        // Fetch articles using the ArticleService
        $articles = $this->articleService->fetchArticles($source, $category, $searchQuery);

        return response()->json($articles);
    }
}
