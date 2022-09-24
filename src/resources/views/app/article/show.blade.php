@extends('layouts.app')
@section('content')
<div id="app">
    <div class="col-12 p-3">
        <img src="{{ $article->img }}" class="border rounded ex-auto d-block" alt="...">
        <h5 class="mt-5">{{ $article->title }}</h5>
        <p>
            @foreach($article->tags as $tag)
                @if($loop->last)
                    <span class="tag">{{ $tag->label }}</span>
                @else
                    <span class="tag">{{ $tag->label }} |</span>
                @endif
            @endforeach
        </p>
        <p class="card-text">{{ $article->body }}</p>
        <p>Опубликовано: <i>{{ $article->createdAtForHumans() }}</i></p>
    </div>
    <hr>
    <div class="row">
        <div>
        <form action="">
            <div class="mb-3">
                <label for="commentSubject" class="form-label">Тема комментария</label>
                <input type="text" class="form-control" id="commentSubject">
            </div>
            <div class="mb-3">
                <label for="commentBody" class="form-label">Комментарий</label>
                <textarea class="form-control" id="commentBody" rows="3"></textarea>
                <button class="btn btn-success mt-3" type="submit">Отправить</button>
            </div>
        </form>
        </div>
        <div class="pb-5 mt-5 mx-auto">
            @foreach($article->comments as $comment)
                <div class="toast show mb-2" style="width: 100%">
                    <div class="toast-header">
                        <img src="https://via.placeholder.com/50/5f1138/ffffff/?text=User" class="rounded me-2" alt="">
                        <strong class="me-auto">{{ $comment->subject }}</strong>
                        <small class="text-muted">{{ $comment->createdAtForHumans() }}</small>
                    </div>
                    <div class="toast-body">
                        {{ $comment->body }}
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection

@section('vue')

@endsection
