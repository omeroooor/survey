<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileManagerController extends Controller
{
    public function listFiles() {
        $directory = 'public\manager';
        $directories = Storage::disk('local')->allDirectories($directory);
        return $directories;
    }
}
