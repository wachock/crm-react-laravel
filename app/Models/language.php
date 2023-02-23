<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Symfony\Component\Yaml\Yaml;

class language extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'code'
    ];
    public function languageDir(): string
    {
        return ('localization/'.$this->code.'/');
    }

    public function getLocaleArrayFromFile(): mixed
    {
        return File::getRequire($this->languageDir().'locale.json');
    }

    public function updateFromYaml($yaml): bool|int
    {
        $content = '<?php return '.var_export(Yaml::parse($yaml), true).';';

        return File::put($this->languageDir().'locale.json', $content);

    }
}
