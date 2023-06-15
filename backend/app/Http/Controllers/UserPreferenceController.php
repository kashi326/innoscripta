<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function show(Request $request)
    {
        $userId = $request->user()->id;
        $userPreference = UserPreference::where('user_id', $userId)->firstOrFail();

        return response()->json($userPreference);
    }

    public function update(Request $request)
    {
        $userId = $request->user()->id;
        $userPreference = UserPreference::where('user_id', $userId)->firstOrFail();

        $userPreference->update([
            'preferred_sources' => $request->input('preferred_sources'),
            'preferred_categories' => $request->input('preferred_categories'),
            'preferred_authors' => $request->input('preferred_authors'),
        ]);

        return response()->json($userPreference);
    }
}
