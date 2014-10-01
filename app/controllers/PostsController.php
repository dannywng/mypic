<?php

class PostsController extends \BaseController {

	public function create(){

		return View::make('posts.create');

	}

	public function store(){




		if (Input::hasfile('thumbnail'))
		{

			$files = Input::file('thumbnail');

			foreach ($files as $file) {

			$name = time() . '-' . $file->getClientOriginalName();

			$file = $file -> move(public_path().'/uploadedImgs/', $name);

			$post= new Post;

			$post->title = Input::get('title');

			$post->body = Input::get('body');



			$post->thumbnail =$name;

			$post->save();

			}

			return "done";

		}



	}

}